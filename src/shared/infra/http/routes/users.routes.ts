import express from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { UserController } from '@modules/accounts/useCases/createUserController';
import { UpdateUserAvaterController } from '@modules/accounts/useCases/UpdateUseAvater/updateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const userController = new UserController();
const updateUseAvatarController = new UpdateUserAvaterController();

const uploadAvatar = multer(uploadConfig);

const userRoutes = express.Router();

userRoutes.post('/', userController.handle);

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    ensureAdmin,
    uploadAvatar.single('avatar'),
    updateUseAvatarController.handle,
);

export { userRoutes };
