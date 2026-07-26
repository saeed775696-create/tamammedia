import { z } from 'zod';

function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

export const externalUrlSchema = z
  .string()
  .trim()
  .url('A valid URL is required')
  .refine(isHttpUrl, 'Only HTTP and HTTPS URLs are allowed');

export const imageUrlSchema = z
  .string()
  .trim()
  .min(1, 'Image URL is required')
  .refine(
    (value) => value.startsWith('/') || (value.startsWith('https://') && isHttpUrl(value)),
    'Images must use a local path or HTTPS URL'
  );
