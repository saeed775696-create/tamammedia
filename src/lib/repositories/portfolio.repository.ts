import { prisma } from '@/lib/prisma';
import { PortfolioItem, Prisma } from '@prisma/client';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../validations/portfolio.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface IPortfolioRepository {
  findAll(params: PaginationParams): Promise<{ items: PortfolioItem[]; total: number }>;
  findById(id: string): Promise<PortfolioItem | null>;
  count(): Promise<number>;
  create(data: CreatePortfolioInput): Promise<PortfolioItem>;
  update(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem>;
  delete(id: string): Promise<void>;
}

/**
 * يحوّل قيمة gallery/technologies إلى JSON متوافق مع Prisma + PostgreSQL.
 *
 * ملاحظة: في PostgreSQL، null لـ Json type يحتاج Prisma.DbNull صراحةً.
 * نقبل: string (JSON) | array | null | undefined
 */
function toJson(value: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return Prisma.DbNull;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) && parsed.length === 0
        ? Prisma.DbNull
        : (parsed as Prisma.InputJsonValue);
    } catch {
      return value as Prisma.InputJsonValue;
    }
  }
  if (Array.isArray(value)) {
    return value.length === 0 ? Prisma.DbNull : (value as Prisma.InputJsonValue);
  }
  return value as Prisma.InputJsonValue;
}

export class PrismaPortfolioRepository implements IPortfolioRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: PortfolioItem[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.portfolioItem.findMany({
        skip,
        take: limit,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
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

  async count(): Promise<number> {
    return prisma.portfolioItem.count();
  }

  async create(data: CreatePortfolioInput): Promise<PortfolioItem> {
    return prisma.portfolioItem.create({
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        imageUrl: data.imageUrl,
        gallery: toJson(data.gallery),
        category: data.category,
        clientName: data.clientName || null,
        completionDate: data.completionDate || null,
        technologies: toJson(data.technologies),
        link: data.link || null,
        videoUrl: data.videoUrl || null,
        featured: data.featured,
        order: data.order,
      },
    });
  }

  async update(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Portfolio item with id ${id} not found`);
    }

    // بناء كائن التحديث بذكاء: نطبّق الحقول الموجودة فقط
    const updateData: Prisma.PortfolioItemUpdateInput = {};
    if (data.titleEn !== undefined) updateData.titleEn = data.titleEn;
    if (data.titleAr !== undefined) updateData.titleAr = data.titleAr;
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn || null;
    if (data.descriptionAr !== undefined) updateData.descriptionAr = data.descriptionAr || null;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.gallery !== undefined) updateData.gallery = toJson(data.gallery);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.clientName !== undefined) updateData.clientName = data.clientName || null;
    if (data.completionDate !== undefined) updateData.completionDate = data.completionDate || null;
    if (data.technologies !== undefined) updateData.technologies = toJson(data.technologies);
    if (data.link !== undefined) updateData.link = data.link || null;
    if (data.videoUrl !== undefined) updateData.videoUrl = data.videoUrl || null;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.order !== undefined) updateData.order = data.order;

    return prisma.portfolioItem.update({
      where: { id },
      data: updateData,
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
