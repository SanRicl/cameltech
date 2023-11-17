import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUseCase';
import { AppError } from '@errors/AppError';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      age,
    }: {
      name: string;
      email: string;
      age: number;
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    try {
      const user = await createUserUseCase.execute({
        name,
        email,
        age,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.json(err);
    }
  }
}
export { CreateUserController };
