import { logger } from '../logger';

export interface IAIProvider {
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  analyzeImage(imageUrl: string, prompt: string): Promise<string>;
}

/**
 * مزوّد وهمي للتطوير والاختبار —
 * يُرجع ردوداً متوقعة بدون استدعاء أي خدمة خارجية.
 * عند إضافة مزوّد حقيقي مستقبلاً (OpenAI وغيره)،
 * نفّذ IAIProvider وحدّث AIProviderFactory.
 */
export class MockAIProvider implements IAIProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generateText(prompt: string, _systemPrompt?: string): Promise<string> {
    logger.info('Mocking AI text generation', { promptLength: prompt.length });
    return `Mock AI response for prompt: ${prompt.substring(0, 20)}...`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async analyzeImage(imageUrl: string, _prompt: string): Promise<string> {
    logger.info('Mocking AI image analysis', { imageUrl });
    return `Mock image analysis for ${imageUrl}`;
  }
}

// Factory to get configured AI Provider
export class AIProviderFactory {
  static getProvider(): IAIProvider {
    // For now we return mock. Can read from config.ai.provider in the future.
    return new MockAIProvider();
  }
}
