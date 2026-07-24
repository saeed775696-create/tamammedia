import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

/**
 * واجهة أساسية للـ CRUD operations
 */
export interface IBaseRepository<T> {
  findAll(params: PaginationParams): Promise<{ items: T[]; total: number }>;
  findById(id: string): Promise<T | null>;
  create(data: Record<string, unknown>): Promise<T>;
  update(id: string, data: Record<string, unknown>): Promise<T>;
  delete(id: string): Promise<void>;
}

/**
 * كلاس أساسي لتقليل تكرار منطق CRUD في الـ repositories
 * يقوم كل repository بتوريث هذا الكلاس وتنفيذ create / update حسب احتياجه
 */
export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected abstract modelName: string;

  abstract findAll(params: PaginationParams): Promise<{ items: T[]; total: number }>;
  abstract findById(id: string): Promise<T | null>;
  abstract create(data: Record<string, unknown>): Promise<T>;
  abstract update(id: string, data: Record<string, unknown>): Promise<T>;

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`${this.modelName} with id ${id} not found`);
    }
    await this.performDelete(id);
  }

  protected abstract performDelete(id: string): Promise<void>;
}