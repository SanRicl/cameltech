import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindProfessionByIdUseCase } from './FindProfessionByIdUseCase';

class FindProfessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProfessionById = container.resolve(FindProfessionByIdUseCase);

    try {
      const profession = await findProfessionById.execute(id);
      return response.json(profession);
    } catch (error) {
      return response.json(error);
    }
  }
}

export { FindProfessionController };
