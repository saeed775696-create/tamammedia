import { prisma } from '@/lib/prisma';
import { PortfolioItem } from '@prisma/client';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../validations/portfolio.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface IPortfolioRepository {
  findAll(params: PaginationParams): Promise<{ items: PortfolioItem[]; total: number }>;
  findById(id: string): Promise<PortfolioItem | null>;
  create(data: CreatePortfolioInput): Promise<PortfolioItem>;
  update(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem>;
  delete(id: string): Promise<void>;
}

export class PrismaPortfolioRepository implements IPortfolioRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: PortfolioItem[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.portfolioItem.findMany({
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.portfolioItem.count(),
    ]);

    return { items, total };
  }

  async findById(id: string): Promise<PortfolioItem | null> {
    return prisma.portfolioItem.findUnique({
      where: { id },
    });
  }

  async create(data: CreatePortfolioInput): Promise<PortfolioItem> {
    return prisma.portfolioItem.create({
      data: {
        ...data,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        gallery: data.gallery || null,
        clientName: data.clientName || null,
        completionDate: data.completionDate || null,
        technologies: data.technologies || null,
        link: data.link || null,
        videoUrl: data.videoUrl || null,
      },
    });
  }

  async update(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Portfolio item with id ${id} not found`);
    }

    return prisma.portfolioItem.update({
      where: { id },
      data: {
        ...data,
        // map undefined to the existing value to allow partial updates properly via Prisma,
        // though Prisma handles undefined by ignoring the field. 
        // We ensure nulls are explicitly passed if provided.
        descriptionEn: data.descriptionEn !== undefined ? data.descriptionEn : undefined,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Portfolio item with id ${id} not found`);
    }

    await prisma.portfolioItem.delete({
      where: { id },
    });
  }
}
