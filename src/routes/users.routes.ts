import express from 'express';
import { UserController } from '../modules/accounts/useCases/createUserController';

const userController = new UserController();

const userRoutes = express.Router();

userRoutes.post('/', userController.handle);

export { userRoutes };
