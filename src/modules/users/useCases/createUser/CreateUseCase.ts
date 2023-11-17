import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';
import { User } from '@prisma/client';

interface IRequest {
  name: string;
  email: string;
  age: number;
}
interface IResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: Date;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({ name, email, age }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists');

    if (age < 18) throw new AppError('Age must be Above 18');

    if (name && name.length < 3) throw new AppError('Name´s too short');
    else if (name && name.length > 55) throw new AppError('Name´s too long');


    const createdUser = await this.userRepository.create({
      email,
      name,
      age,
    });

    const userResponse: IResponse = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      age: createdUser.age,
      created_at: createdUser.created_at,
    };

    return userResponse;
  }
}

export { CreateUserUseCase };
