import { prisma } from '@/lib/prisma';
import { Partner } from '@prisma/client';
import { CreatePartnerInput, UpdatePartnerInput } from '../validations/partner.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface IPartnerRepository {
  findAll(params: PaginationParams): Promise<{ items: Partner[]; total: number }>;
  findById(id: string): Promise<Partner | null>;
  count(): Promise<number>;
  create(data: CreatePartnerInput): Promise<Partner>;
  update(id: string, data: UpdatePartnerInput): Promise<Partner>;
  delete(id: string): Promise<void>;
}

export class PrismaPartnerRepository implements IPartnerRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: Partner[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.partner.findMany({
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.partner.count(),
    ]);

    return { items, total };
  }

  async findById(id: string): Promise<Partner | null> {
    return prisma.partner.findUnique({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return prisma.partner.count();
  }

  async create(data: CreatePartnerInput): Promise<Partner> {
    return prisma.partner.create({
      data: {
        ...data,
        website: data.website || null,
      },
    });
  }

  async update(id: string, data: UpdatePartnerInput): Promise<Partner> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Partner with id ${id} not found`);
    }

    return prisma.partner.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Partner with id ${id} not found`);
    }

    await prisma.partner.delete({
      where: { id },
    });
  }
}
