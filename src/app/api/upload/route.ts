import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ApiResponseHandler } from '@/lib/api';
import { ValidationError } from '@/lib/api/errors';

export async function POST(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const supabaseUrl = 'https://nxrkeuabjyjalgsrmbzv.supabase.co';
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

    const { data, error } = await supabase.storage
      .from('media')
      .upload(`${Date.now()}_${file.name}`, file, { upsert: true });

    if (error) {
      throw new Error(error.message);
    }

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);
      
    return { url: urlData.publicUrl };
  }, { status: 201 });
}
