import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      is_active,
      age,
    }: {
      name?: string;
      email?: string;
      age?: number;
      is_active?: boolean;
    } = request.body;

    const { id } = request.params;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    try {
      const updatedUser = await updateUserUseCase.execute({
        id,
        name,
        email,
        age,
        is_active,
      });

      return response.status(200).json(updatedUser);
    } catch (err) {
      return response.json(err);
    }
  }
}
export { UpdateUserController };
