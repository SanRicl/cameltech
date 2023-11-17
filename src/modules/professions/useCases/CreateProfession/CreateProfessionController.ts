import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProfessionUseCase from './CreateProfessionUseCase';

export default class CreateProfessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      user_id,
    }: {
      name: string;
      user_id: string;
    } = request.body;

    const createUserProfession = container.resolve(CreateProfessionUseCase);

    try {
      const profession = await createUserProfession.execute({
        name,
        user_id,
      });

      return response.status(201).json(profession);
    } catch (error) {
      return response.json(error);
    }
  }
}
