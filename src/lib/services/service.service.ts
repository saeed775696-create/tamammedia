import { IServiceRepository } from '../repositories/service.repository';
import { CreateServiceInput, UpdateServiceInput } from '../validations/service.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class ServiceService {
  constructor(private repository: IServiceRepository) {}

  async getAllServices(params: PaginationParams) {
    logger.info('Fetching services', { ...params });
    return this.repository.findAll(params);
  }

  async getServiceById(id: string) {
    logger.info('Fetching service', { id });
    return this.repository.findById(id);
  }

  async createService(data: CreateServiceInput) {
    logger.info('Creating service', { titleEn: data.titleEn });
    return this.repository.create(data);
  }

  async updateService(id: string, data: UpdateServiceInput) {
    logger.info('Updating service', { id });
    return this.repository.update(id, data);
  }

  async deleteService(id: string) {
    logger.info('Deleting service', { id });
    return this.repository.delete(id);
  }
}
