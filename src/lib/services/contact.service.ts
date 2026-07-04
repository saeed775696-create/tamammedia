import { IContactRepository } from '../repositories/contact.repository';
import { CreateContactInput, UpdateContactInput } from '../validations/contact.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class ContactService {
  constructor(private repository: IContactRepository) {}

  async getAllSubmissions(params: PaginationParams) {
    logger.info('Fetching contact submissions', { ...params });
    return this.repository.findAll(params);
  }

  async getSubmissionById(id: string) {
    logger.info('Fetching contact submission', { id });
    return this.repository.findById(id);
  }

  async submitContact(data: CreateContactInput) {
    logger.info('Creating contact submission', { email: data.email });
    // Additional logic like sending an email notification can go here
    return this.repository.create(data);
  }

  async updateSubmissionStatus(id: string, data: UpdateContactInput) {
    logger.info('Updating contact submission status', { id, status: data.status });
    return this.repository.updateStatus(id, data);
  }

  async deleteSubmission(id: string) {
    logger.info('Deleting contact submission', { id });
    return this.repository.delete(id);
  }
}
