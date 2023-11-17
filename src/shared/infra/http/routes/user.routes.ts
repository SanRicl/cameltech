import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListAllUsersController } from '@modules/users/useCases/listAllUsers/ListAllUsersController';
import { FindUserController } from '@modules/users/useCases/findUser/FindUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';
import { DeactivateUserController } from '@modules/users/useCases/deactivateUser/DeactivateUserController';

const userRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListAllUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deactivateUserController = new DeactivateUserController();

userRouter.post('/', createUserController.handle);
userRouter.get('/', listUsersController.handle);
userRouter.get('/:id', findUserController.handle);
userRouter.put('/:id', updateUserController.handle);
userRouter.put('/deactivate/:id', deactivateUserController.handle);

export { userRouter };
