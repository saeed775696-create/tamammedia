import { prisma } from '@/lib/prisma';
import { ContactSubmission } from '@prisma/client';
import { CreateContactInput, UpdateContactInput } from '../validations/contact.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface IContactRepository {
  findAll(params: PaginationParams): Promise<{ items: ContactSubmission[]; total: number }>;
  findById(id: string): Promise<ContactSubmission | null>;
  findRecent(limit: number): Promise<ContactSubmission[]>;
  count(status?: string): Promise<number>;
  create(data: CreateContactInput): Promise<ContactSubmission>;
  updateStatus(id: string, data: UpdateContactInput): Promise<ContactSubmission>;
  update(id: string, data: UpdateContactInput): Promise<ContactSubmission>;
  delete(id: string): Promise<void>;
}

export class PrismaContactRepository implements IContactRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: ContactSubmission[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactSubmission.count(),
    ]);

    return { items, total };
  }

  async findRecent(limit: number): Promise<ContactSubmission[]> {
    return prisma.contactSubmission.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(status?: string): Promise<number> {
    return prisma.contactSubmission.count({
      where: status ? { status } : undefined,
    });
  }

  async findById(id: string): Promise<ContactSubmission | null> {
    return prisma.contactSubmission.findUnique({
      where: { id },
    });
  }

  async create(data: CreateContactInput): Promise<ContactSubmission> {
    return prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
        language: data.language,
        status: 'new',
      },
    });
  }

  async update(id: string, data: UpdateContactInput): Promise<ContactSubmission> {
    return this.updateStatus(id, data);
  }

  async updateStatus(id: string, data: UpdateContactInput): Promise<ContactSubmission> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Contact submission with id ${id} not found`);
    }

    return prisma.contactSubmission.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Contact submission with id ${id} not found`);
    }

    await prisma.contactSubmission.delete({
      where: { id },
    });
  }
}
