import { AppError } from '@errors/AppError';
import UsersRepository from '@modules/users/prisma/repositories/UsersRepository';
import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found.');

    return user;
  }
}

export { FindUserByIdUseCase };
