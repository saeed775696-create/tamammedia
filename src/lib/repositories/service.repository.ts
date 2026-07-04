import { prisma } from '@/lib/prisma';
import { Service } from '@prisma/client';
import { CreateServiceInput, UpdateServiceInput } from '../validations/service.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface IServiceRepository {
  findAll(params: PaginationParams): Promise<{ items: Service[]; total: number }>;
  findById(id: string): Promise<Service | null>;
  create(data: CreateServiceInput): Promise<Service>;
  update(id: string, data: UpdateServiceInput): Promise<Service>;
  delete(id: string): Promise<void>;
}

export class PrismaServiceRepository implements IServiceRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: Service[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.service.findMany({
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.service.count(),
    ]);

    return { items, total };
  }

  async findById(id: string): Promise<Service | null> {
    return prisma.service.findUnique({
      where: { id },
    });
  }

  async create(data: CreateServiceInput): Promise<Service> {
    return prisma.service.create({
      data: {
        ...data,
        iconName: data.iconName || null,
        imageUrl: data.imageUrl || null,
      },
    });
  }

  async update(id: string, data: UpdateServiceInput): Promise<Service> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Service with id ${id} not found`);
    }

    return prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Service with id ${id} not found`);
    }

    await prisma.service.delete({
      where: { id },
    });
  }
}
