import express from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/refreshTokenController';

const authenticateUserRouter = express.Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateUserRouter.post('/sessions', authenticateUserController.handle);
authenticateUserRouter.post('/refresh-token', refreshTokenController.handle);

export { authenticateUserRouter };
