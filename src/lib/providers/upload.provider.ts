
import { logger } from '../logger';

export interface FileUploadResult {
  url: string;
  key: string;
  size: number;
  mimeType: string;
}

export interface IUploadProvider {
  upload(file: File, folder?: string): Promise<FileUploadResult>;
  delete(key: string): Promise<boolean>;
  getSignedUrl?(key: string): Promise<string>;
}

export class LocalUploadProvider implements IUploadProvider {
  async upload(file: File, folder: string = 'general'): Promise<FileUploadResult> {
    try {
      logger.info(`Uploading file to local storage`, { filename: file.name, folder });
      // In a real application, you would save the file to the local disk here
      // For this implementation, we return a mock result
      
      const key = `${folder}/${Date.now()}-${file.name}`;
      const url = `/uploads/${key}`; // Mock URL
      
      return {
        url,
        key,
        size: file.size,
        mimeType: file.type,
      };
    } catch (error) {
      logger.error('Failed to upload file locally', error, { filename: file.name });
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    logger.info(`Deleting file from local storage`, { key });
    // Mock deletion
    return true;
  }
}

// Factory to get the configured provider
export class UploadProviderFactory {
  static getProvider(): IUploadProvider {
    // We could switch based on config.upload.provider
    return new LocalUploadProvider();
  }
}
