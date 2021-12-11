import express from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateUserRouter = express.Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUserRouter.post('/sessions', authenticateUserController.handle);

export { authenticateUserRouter };
