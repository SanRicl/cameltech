import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findUserById = container.resolve(FindUserByIdUseCase);

    try {
      const user = await findUserById.execute(id);
      return response.json(user);
    } catch (error) {
      return response.json(error);
    }
  }
}

export { FindUserController };
