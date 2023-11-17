import { AppError } from '@errors/AppError';
import IProfessionsRepository from '@modules/professions/infra/repositories/IProfessionsRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { Profession } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name?: string;
  user_id?: string;
  id: string;
}

@injectable()
export default class UpdateProfessionUseCase {
  constructor(
    @inject('ProfessionRepository')
    private readonly professionRepository: IProfessionsRepository,

    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}
  async execute({ name, user_id, id }: IRequest): Promise<Profession> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) throw new AppError('User not found.');

    const userProfission = await this.professionRepository.findByUseId(
      userExists.id,
    );

    if (!userProfission) throw new AppError('Users doesn´t have a profession.');

    const professionUpdated = await this.professionRepository.update({
      name,
      user_id,
      id,
    });

    return professionUpdated;
  }
}
