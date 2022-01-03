import { Router } from 'express';
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPassword/sendForgotPasswordController';
import { ResetPasswordController } from '@modules/accounts/useCases/resetPasswordUser/resetPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
