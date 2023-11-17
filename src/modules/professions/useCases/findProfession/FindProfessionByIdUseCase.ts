import { AppError } from '@errors/AppError';
import IProfessionsRepository from '@modules/professions/infra/repositories/IProfessionsRepository';
import { Profession } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindProfessionByIdUseCase {
  constructor(
    @inject('ProfessionRepository')
    private readonly professionRepository: IProfessionsRepository,

  ) {}

  async execute(id: string): Promise<Profession> {
    const profession = await this.professionRepository.findById(id);

    if (!profession) throw new AppError('Profession not found.');

    return profession;
  }
}

export { FindProfessionByIdUseCase };
