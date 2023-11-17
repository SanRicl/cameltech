import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';
import { User } from '@prisma/client';

interface IResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  is_active: boolean;
  updated_at: Date;
}

@injectable()
class DeactivateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute( id: string): Promise<IResponse> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) throw new AppError('User not found.');

    const updatedUser = await this.userRepository.update({
      id,
      is_active: !userFound.is_active,
    });

    const userResponse: IResponse = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      is_active: updatedUser.is_active,
      updated_at: updatedUser.update_at,
    };

    return userResponse;
  }
}

export { DeactivateUserUseCase };
