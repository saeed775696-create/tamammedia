import { ITeamRepository } from '../repositories/team.repository';
import { CreateTeamMemberInput, UpdateTeamMemberInput } from '../validations/team.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class TeamService {
  constructor(private repository: ITeamRepository) {}

  async getAllMembers(params: PaginationParams) {
    logger.info('Fetching team members', { ...params });
    return this.repository.findAll(params);
  }

  async getMemberById(id: string) {
    logger.info('Fetching team member', { id });
    return this.repository.findById(id);
  }

  async createMember(data: CreateTeamMemberInput) {
    logger.info('Creating team member', { name: data.name });
    return this.repository.create(data);
  }

  async updateMember(id: string, data: UpdateTeamMemberInput) {
    logger.info('Updating team member', { id });
    return this.repository.update(id, data);
  }

  async deleteMember(id: string) {
    logger.info('Deleting team member', { id });
    return this.repository.delete(id);
  }
}
