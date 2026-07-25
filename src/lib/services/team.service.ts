import { BaseService } from './base.service';
import { ITeamRepository } from '../repositories/team.repository';
import { CreateTeamMemberInput, UpdateTeamMemberInput } from '../validations/team.schema';
import { PaginationParams } from '../api/pagination';

export class TeamService extends BaseService<Record<string, unknown>, CreateTeamMemberInput, UpdateTeamMemberInput> {
  constructor(repository: ITeamRepository) {
    super(repository, 'team member');
  }

  async getAllMembers(params: PaginationParams) {
    return this.getAll(params);
  }

  async getMemberById(id: string) {
    return this.getById(id);
  }

  async createMember(data: CreateTeamMemberInput) {
    return this.create(data);
  }

  async updateMember(id: string, data: UpdateTeamMemberInput) {
    return this.update(id, data);
  }

  async deleteMember(id: string) {
    return this.delete(id);
  }
}
