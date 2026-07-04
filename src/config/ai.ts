import { z } from 'zod';

const envSchema = z.object({
  AI_PROVIDER: z.enum(['openai', 'anthropic', 'custom', 'none']).default('none'),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
});

const env = envSchema.parse({
  AI_PROVIDER: process.env.AI_PROVIDER,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
});

export const aiConfig = {
  provider: env.AI_PROVIDER,
  keys: {
    openai: env.OPENAI_API_KEY,
    anthropic: env.ANTHROPIC_API_KEY,
  }
};
