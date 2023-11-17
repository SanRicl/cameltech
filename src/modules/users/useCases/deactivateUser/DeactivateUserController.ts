import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { DeactivateUserUseCase } from './DeactivateUserUseCase';

class DeactivateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateUserUseCase = container.resolve(DeactivateUserUseCase);
    try {
      const updatedUser = await updateUserUseCase.execute(id);
      return response.status(200).json(updatedUser);
    } catch (err) {
      return response.json(err);
    }
  }
}
export { DeactivateUserController };
