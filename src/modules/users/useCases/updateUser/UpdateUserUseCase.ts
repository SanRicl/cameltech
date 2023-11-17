import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';
import { User } from '@prisma/client';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  age?: number;
  is_active?: boolean;
}
interface IResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  is_active: boolean;
  updated_at: Date;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    id,
    age,
    is_active,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) throw new AppError('User not found.');

    if (age < 18) throw new AppError('Age must be Above 18');

    if (name && name.length < 3) throw new AppError('Name´s too short');
    else if (name && name.length > 55) throw new AppError('Name´s too long');

    const updatedUser = await this.userRepository.update({
      email,
      name,
      age,
      id,
      is_active,
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

export { UpdateUserUseCase };
