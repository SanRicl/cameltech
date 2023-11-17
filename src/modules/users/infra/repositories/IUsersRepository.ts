import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';
import { User } from '@prisma/client';
export default interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (user_id: string) => Promise<User | null>;
  update: (data: IUpdateUserDTO) => Promise<User>;
  list: () => Promise<User[]>;
}
