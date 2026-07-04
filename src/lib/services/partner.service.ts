import { IPartnerRepository } from '../repositories/partner.repository';
import { CreatePartnerInput, UpdatePartnerInput } from '../validations/partner.schema';
import { PaginationParams } from '../api/pagination';
import { logger } from '../logger';

export class PartnerService {
  constructor(private repository: IPartnerRepository) {}

  async getAllPartners(params: PaginationParams) {
    logger.info('Fetching partners', { ...params });
    return this.repository.findAll(params);
  }

  async getPartnerById(id: string) {
    logger.info('Fetching partner', { id });
    return this.repository.findById(id);
  }

  async createPartner(data: CreatePartnerInput) {
    logger.info('Creating partner', { name: data.name });
    return this.repository.create(data);
  }

  async updatePartner(id: string, data: UpdatePartnerInput) {
    logger.info('Updating partner', { id });
    return this.repository.update(id, data);
  }

  async deletePartner(id: string) {
    logger.info('Deleting partner', { id });
    return this.repository.delete(id);
  }
}
