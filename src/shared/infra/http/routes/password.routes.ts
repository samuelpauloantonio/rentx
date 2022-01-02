import { Router } from 'express';
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPassword/sendForgotPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);

export { passwordRoutes };
