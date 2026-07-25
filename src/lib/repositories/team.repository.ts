import { prisma } from '@/lib/prisma';
import { TeamMember } from '@prisma/client';
import { CreateTeamMemberInput, UpdateTeamMemberInput } from '../validations/team.schema';
import { PaginationParams } from '../api/pagination';
import { NotFoundError } from '../api/errors';

export interface ITeamRepository {
  findAll(params: PaginationParams): Promise<{ items: TeamMember[]; total: number }>;
  findById(id: string): Promise<TeamMember | null>;
  count(): Promise<number>;
  create(data: CreateTeamMemberInput): Promise<TeamMember>;
  update(id: string, data: UpdateTeamMemberInput): Promise<TeamMember>;
  delete(id: string): Promise<void>;
}

export class PrismaTeamRepository implements ITeamRepository {
  async findAll({ skip, limit }: PaginationParams): Promise<{ items: TeamMember[]; total: number }> {
    const [items, total] = await Promise.all([
      prisma.teamMember.findMany({
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.teamMember.count(),
    ]);

    return { items, total };
  }

  async findById(id: string): Promise<TeamMember | null> {
    return prisma.teamMember.findUnique({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return prisma.teamMember.count();
  }

  async create(data: CreateTeamMemberInput): Promise<TeamMember> {
    return prisma.teamMember.create({
      data: {
        ...data,
        bio: data.bio || null,
        imageUrl: data.imageUrl || null,
      },
    });
  }

  async update(id: string, data: UpdateTeamMemberInput): Promise<TeamMember> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Team member with id ${id} not found`);
    }

    return prisma.teamMember.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundError(`Team member with id ${id} not found`);
    }

    await prisma.teamMember.delete({
      where: { id },
    });
  }
}
