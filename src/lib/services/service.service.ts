import { BaseService } from './base.service';
import { IServiceRepository } from '../repositories/service.repository';
import { CreateServiceInput, UpdateServiceInput } from '../validations/service.schema';
import { PaginationParams } from '../api/pagination';

export class ServiceService extends BaseService<any, CreateServiceInput, UpdateServiceInput> {
  constructor(repository: IServiceRepository) {
    super(repository, 'service');
  }

  async getAllServices(params: PaginationParams) {
    return this.getAll(params);
  }

  async getServiceById(id: string) {
    return this.getById(id);
  }

  async createService(data: CreateServiceInput) {
    return this.create(data);
  }

  async updateService(id: string, data: UpdateServiceInput) {
    return this.update(id, data);
  }

  async deleteService(id: string) {
    return this.delete(id);
  }
}
