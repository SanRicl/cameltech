import UsersRepository from '@modules/users/prisma/repositories/UsersRepository';
import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
