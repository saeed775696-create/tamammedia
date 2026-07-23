import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ApiResponseHandler, requireAdmin } from '@/lib/api';
import { ValidationError } from '@/lib/api/errors';

export async function POST(req: NextRequest) {
  // رفع الصور متاح فقط للمسؤول (يُستخدم من لوحة التحكم)
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'إعداد Supabase غير مكتمل. تأكد من ضبط NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY'
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      throw new ValidationError('لم يتم رفع أي ملف');
    }

    // التحقق من نوع الملف (صور فقط) لأمان أكبر
    if (!file.type.startsWith('image/')) {
      throw new ValidationError('يُسمح برفع الصور فقط');
    }

    // التحقق من الحجم (أقل من 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new ValidationError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
    }

    // تنظيف اسم الملف
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, { upsert: true });

    if (error) {
      throw new Error(error.message);
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl };
  }, { status: 201 });
}
