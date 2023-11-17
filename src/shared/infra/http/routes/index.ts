import { Router } from 'express';

import { userRouter } from './user.routes';
import { professionRouter } from './profession.routes';

export const router = Router();

router.use('/users', userRouter);
router.use('/professions', professionRouter);
