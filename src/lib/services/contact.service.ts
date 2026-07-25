import { BaseService } from './base.service';
import { IContactRepository } from '../repositories/contact.repository';
import { CreateContactInput, UpdateContactInput } from '../validations/contact.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class ContactService extends BaseService<Record<string, unknown>, CreateContactInput, UpdateContactInput> {
  constructor(repository: IContactRepository) {
    super(repository, 'contact submission');
  }

  async getAllSubmissions(params: PaginationParams) {
    return this.getAll(params);
  }

  async getSubmissionById(id: string) {
    return this.getById(id);
  }

  async submitContact(data: CreateContactInput) {
    logger.info('Creating contact submission', { email: data.email });
    // Additional logic like sending an email notification can go here
    return this.repository.create(data as unknown as Record<string, unknown>);
  }

  async updateSubmissionStatus(id: string, data: UpdateContactInput) {
    logger.info('Updating contact submission status', { id, status: data.status });
    return this.repository.update(id, data as unknown as Record<string, unknown>);
  }

  async deleteSubmission(id: string) {
    return this.delete(id);
  }
}
