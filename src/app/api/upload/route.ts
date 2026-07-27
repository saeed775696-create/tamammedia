import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ApiResponseHandler, requireEditor } from '@/lib/api';
import { ValidationError } from '@/lib/api/errors';

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

function hasValidImageSignature(bytes: Uint8Array, type: string): boolean {
  if (type === 'image/jpeg') {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (type === 'image/png') {
    const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    return signature.every((byte, index) => bytes[index] === byte);
  }

  if (type === 'image/webp') {
    const riff = [0x52, 0x49, 0x46, 0x46];
    const webp = [0x57, 0x45, 0x42, 0x50];
    return riff.every((byte, index) => bytes[index] === byte)
      && webp.every((byte, index) => bytes[index + 8] === byte);
  }

  return false;
}

export async function POST(req: NextRequest) {
  // رفع الصور متاح فقط للمسؤول (يُستخدم من لوحة التحكم)
  const guard = await requireEditor();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const contentLength = Number(req.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_SIZE + 100_000) {
      throw new ValidationError('Upload must be smaller than 5 MB');
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'إعداد Supabase غير مكتمل. تأكد من ضبط NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY'
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File) || file.size === 0) {
      throw new ValidationError('لم يتم رفع أي ملف');
    }

    // التحقق من نوع الملف (صور فقط) لأمان أكبر
    const extension = ALLOWED_IMAGE_TYPES.get(file.type);
    if (!extension) {
      throw new ValidationError('يُسمح برفع الصور فقط');
    }

    // التحقق من الحجم (أقل من 5MB)
    if (file.size > MAX_SIZE) {
      throw new ValidationError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
    }

    // تنظيف اسم الملف
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!hasValidImageSignature(bytes, file.type)) {
      throw new ValidationError('Uploaded content is not a valid image');
    }

    const requestedTestRun =
      process.env.NODE_ENV !== 'production'
        ? req.headers.get('x-dashboard-test-run')?.trim()
        : undefined;
    const testRun =
      requestedTestRun && /^[a-z0-9]{8,32}$/i.test(requestedTestRun)
        ? requestedTestRun
        : undefined;
    const path = testRun
      ? `integration-tests/${testRun}-${crypto.randomUUID()}.${extension}`
      : `${crypto.randomUUID()}.${extension}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl };
  }, { status: 201 });
}
