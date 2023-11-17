import IProfessionsRepository from "@modules/professions/infra/repositories/IProfessionsRepository";
import ProfessionRepository from "@modules/professions/prisma/repositories/ProfessionRepository";
import type IUsersRepository from "@modules/users/infra/repositories/IUsersRepository";
import UsersRepository from "@modules/users/prisma/repositories/UsersRepository";
import { container } from "tsyringe";


type Repositories = IUsersRepository | IProfessionsRepository;

const repositoriesToRegister = {
  UsersRepository,
  ProfessionRepository
};

Object.entries(repositoriesToRegister).forEach((repository) =>
  container.registerSingleton<Repositories>(...repository)
);
