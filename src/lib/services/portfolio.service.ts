import { BaseService } from './base.service';
import { IPortfolioRepository } from '../repositories/portfolio.repository';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../validations/portfolio.schema';
import { PaginationParams } from '../api/pagination';

export class PortfolioService extends BaseService<any, CreatePortfolioInput, UpdatePortfolioInput> {
  constructor(repository: IPortfolioRepository) {
    super(repository, 'portfolio item');
  }

  async getAllItems(params: PaginationParams) {
    return this.getAll(params);
  }

  async getItemById(id: string) {
    return this.getById(id);
  }

  async createItem(data: CreatePortfolioInput) {
    return this.create(data);
  }

  async updateItem(id: string, data: UpdatePortfolioInput) {
    return this.update(id, data);
  }

  async deleteItem(id: string) {
    return this.delete(id);
  }
}
