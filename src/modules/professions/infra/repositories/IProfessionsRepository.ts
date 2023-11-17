import ICreateProfessionDTO from '@modules/professions/dto/ICreateProfessionDTO';
import IUpdateProfessionDTO from '@modules/professions/dto/IUpdateProfessionDTO copy';
import { Profession } from '@prisma/client';

export default interface IProfessionsRepository {
  create: (data: ICreateProfessionDTO) => Promise<Profession>;
  findById(id: string): Promise<Profession | null>;
  update(data: IUpdateProfessionDTO): Promise<Profession>;
  findByUseId(user_id: string): Promise<Profession>;
}
