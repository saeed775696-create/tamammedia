import { IBaseRepository } from '../repositories/base.repository';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';
import { NotFoundError } from '../api/errors';

/**
 * كلاس أساسي لتقليل تكرار الـ CRUD services
 * يوفر عمليات CRUD عامة مع logging تلقائي
 */
export class BaseService<T, TCreate, TUpdate> {
  constructor(
    protected repository: IBaseRepository<T>,
    protected entityName: string
  ) {}

  async getAll(params: PaginationParams) {
    logger.info(`Fetching ${this.entityName}`, { ...params });
    return this.repository.findAll(params);
  }

  async getById(id: string) {
    logger.info(`Fetching ${this.entityName}`, { id });
    const item = await this.repository.findById(id);
    if (!item) {
      throw new NotFoundError(`${this.entityName} with id ${id} not found`);
    }
    return item;
  }

  async create(data: TCreate) {
    logger.info(`Creating ${this.entityName}`, { data });
    return this.repository.create(data as unknown as Record<string, unknown>);
  }

  async update(id: string, data: TUpdate) {
    logger.info(`Updating ${this.entityName}`, { id });
    return this.repository.update(id, data as unknown as Record<string, unknown>);
  }

  async delete(id: string) {
    logger.info(`Deleting ${this.entityName}`, { id });
    return this.repository.delete(id);
  }
}
