import { AppError } from '@errors/AppError';
import IProfessionsRepository from '@modules/professions/infra/repositories/IProfessionsRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { Profession } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
export default class CreateProfessionUseCase {
  constructor(
    @inject('ProfessionRepository')
    private readonly professionRepository: IProfessionsRepository,

    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}
  async execute({ name, user_id }: IRequest): Promise<Profession> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) throw new AppError('User not found.');

    const professionAlreadyAssigned = await this.professionRepository.findByUseId(user_id)
    
    if (professionAlreadyAssigned) throw new AppError('User already have a profession.');

    const professionCreated = await this.professionRepository.create({
      name,
      user_id: userExists.id,
    });

    return professionCreated;
  }
}
