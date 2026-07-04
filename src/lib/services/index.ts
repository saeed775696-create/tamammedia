import { PortfolioService } from './portfolio.service';
import { ServiceService } from './service.service';
import { TeamService } from './team.service';
import { PartnerService } from './partner.service';
import { ContactService } from './contact.service';

import { 
  PrismaPortfolioRepository,
  PrismaServiceRepository,
  PrismaTeamRepository,
  PrismaPartnerRepository,
  PrismaContactRepository
} from '../repositories';

// Dependency Injection container or simple singletons
export const portfolioService = new PortfolioService(new PrismaPortfolioRepository());
export const serviceService = new ServiceService(new PrismaServiceRepository());
export const teamService = new TeamService(new PrismaTeamRepository());
export const partnerService = new PartnerService(new PrismaPartnerRepository());
export const contactService = new ContactService(new PrismaContactRepository());

export * from './portfolio.service';
export * from './service.service';
export * from './team.service';
export * from './partner.service';
export * from './contact.service';
