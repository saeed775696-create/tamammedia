import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ApiResponseHandler } from '@/lib/api';
import { ValidationError } from '@/lib/api/errors';

export async function POST(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxrkeuabjyjalgsrmbzv.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      throw new ValidationError('No file uploaded');
    }

    // Clean file name
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
