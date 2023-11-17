import prisma from '@database/prisma';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { User } from '@prisma/client';

export default class UsersRepository implements IUsersRepository {
  public list = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
      include: {
        profession: true,
      },
    });

    return users;
  };

  public create = async (data: ICreateUserDTO): Promise<User> => {
    const user = await prisma.user.create({
      data,
      include: {
        profession: true,
      },
    });

    return user;
  };

  public findByEmail = async (email: string): Promise<User | null> => {
    const userFound = await prisma.user.findUnique({ where: { email } });

    return userFound;
  };

  public findById = async (user_id: string): Promise<User | null> => {
    const userFound = await prisma.user.findFirst({
      where: { id: user_id },
      include: {
        profession: true,
      },
    });

    return userFound;
  };

  public update = async (data: IUpdateUserDTO): Promise<User> => {
    const userUpdated = await prisma.user.update({
      data,
      where: {
        id: data.id,
      },
      include: {
        profession: true,
      },
    });

    return userUpdated;
  };
}
