import { IPortfolioRepository } from '../repositories/portfolio.repository';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../validations/portfolio.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class PortfolioService {
  constructor(private repository: IPortfolioRepository) {}

  async getAllItems(params: PaginationParams) {
    logger.info('Fetching portfolio items', { ...params });
    return this.repository.findAll(params);
  }

  async getItemById(id: string) {
    logger.info('Fetching portfolio item', { id });
    return this.repository.findById(id);
  }

  async createItem(data: CreatePortfolioInput) {
    logger.info('Creating portfolio item', { titleEn: data.titleEn });
    // Additional business logic like generating slugs, etc. can go here
    return this.repository.create(data);
  }

  async updateItem(id: string, data: UpdatePortfolioInput) {
    logger.info('Updating portfolio item', { id });
    return this.repository.update(id, data);
  }

  async deleteItem(id: string) {
    logger.info('Deleting portfolio item', { id });
    return this.repository.delete(id);
  }
}
