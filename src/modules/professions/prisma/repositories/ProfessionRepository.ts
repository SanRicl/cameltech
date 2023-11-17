import prisma from '@database/prisma';
import ICreateProfessionDTO from '@modules/professions/dto/ICreateProfessionDTO';
import IUpdateProfessionDTO from '@modules/professions/dto/IUpdateProfessionDTO copy';
import IProfessionsRepository from '@modules/professions/infra/repositories/IProfessionsRepository';
import { Profession } from '@prisma/client';

export default class ProfessionRepository implements IProfessionsRepository {
  findByUseId = async (user_id: string): Promise<Profession | null> => {
    const assignedProfession = await prisma.profession.findFirst({
      where: { user_id },
      include: {
        user: true,
      },
    });

    return assignedProfession;
  };
  findById = async (id: string): Promise<Profession | null> => {
    const profession = await prisma.profession.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return profession;
  };

  update = async ({
    id,
    user_id,
    name,
  }: IUpdateProfessionDTO): Promise<Profession> => {
    const updatedProfession = await prisma.profession.update({
      data: {
        name,
      },
      where: {
        id,
        ...(user_id && {
          user_id,
        }),
      },
      include: {
        user: true,
      },
    });

    return updatedProfession;
  };

  create = async (data: ICreateProfessionDTO): Promise<Profession> => {
    const profession = await prisma.profession.create({
      data,
      include: {
        user: true,
      },
    });

    return profession;
  };
}
