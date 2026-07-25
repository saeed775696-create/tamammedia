import { BaseService } from './base.service';
import { IPartnerRepository } from '../repositories/partner.repository';
import { CreatePartnerInput, UpdatePartnerInput } from '../validations/partner.schema';
import { PaginationParams } from '../api/pagination';

export class PartnerService extends BaseService<Record<string, unknown>, CreatePartnerInput, UpdatePartnerInput> {
  constructor(repository: IPartnerRepository) {
    super(repository, 'partner');
  }

  async getAllPartners(params: PaginationParams) {
    return this.getAll(params);
  }

  async getPartnerById(id: string) {
    return this.getById(id);
  }

  async createPartner(data: CreatePartnerInput) {
    return this.create(data);
  }

  async updatePartner(id: string, data: UpdatePartnerInput) {
    return this.update(id, data);
  }

  async deletePartner(id: string) {
    return this.delete(id);
  }
}
