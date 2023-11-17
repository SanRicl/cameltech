import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfessionUseCase from './UpdateProfessionUseCase';

export default class UpdateProfessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const {
      name,
      user_id,
    }: {
      name?: string;
      user_id?: string;
    } = request.body;

    const updateUserProfession = container.resolve(UpdateProfessionUseCase);
    try {
      const profession = await updateUserProfession.execute({
        name,
        user_id,
        id,
      });

      return response.status(201).json(profession);
    } catch (error) {
      return response.json(error);
    }
  }
}
