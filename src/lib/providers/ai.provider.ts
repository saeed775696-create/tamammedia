import { logger } from '../logger';

export interface IAIProvider {
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  analyzeImage(imageUrl: string, prompt: string): Promise<string>;
}

export class MockAIProvider implements IAIProvider {
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    logger.info('Mocking AI text generation', { promptLength: prompt.length });
    return `Mock AI response for prompt: ${prompt.substring(0, 20)}...`;
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<string> {
    logger.info('Mocking AI image analysis', { imageUrl });
    return `Mock image analysis for ${imageUrl}`;
  }
}

export class OpenAIProvider implements IAIProvider {
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    logger.info('Generating text with OpenAI', { promptLength: prompt.length });
    // TODO: Implement actual OpenAI call
    throw new Error('OpenAI Provider not yet implemented');
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<string> {
    logger.info('Analyzing image with OpenAI', { imageUrl });
    // TODO: Implement actual OpenAI vision call
    throw new Error('OpenAI Vision Provider not yet implemented');
  }
}

// Factory to get configured AI Provider
export class AIProviderFactory {
  static getProvider(): IAIProvider {
    // For now we return mock. Can read from config.ai.provider in the future.
    return new MockAIProvider();
  }
}
