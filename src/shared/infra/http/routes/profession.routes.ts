import CreateProfessionController from '@modules/professions/useCases/CreateProfession/CreateProfessionController';
import UpdateProfessionController from '@modules/professions/useCases/UpdateProfession/UpdateProfessionController';
import { FindProfessionController } from '@modules/professions/useCases/findProfession/FindProfessionController';
import { Router } from 'express';

const professionRouter = Router();

const createProfessionController = new CreateProfessionController();
const updateProfessionController = new UpdateProfessionController();
const findProfessionController = new FindProfessionController();

professionRouter.post('/', createProfessionController.handle);
professionRouter.put('/:id', updateProfessionController.handle);
professionRouter.get('/:id', findProfessionController.handle);

export { professionRouter };
