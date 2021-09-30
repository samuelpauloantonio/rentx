import express from 'express';
import multer from 'multer';
import { UserController } from '../modules/accounts/useCases/createUserController';
import { UpdateUserAvaterController } from '../modules/accounts/useCases/UpdateUseAvater/updateUserAvatarController';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userController = new UserController();
const updateUseAvatarController = new UpdateUserAvaterController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const userRoutes = express.Router();

userRoutes.post('/', userController.handle);

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUseAvatarController.handle,
);

export { userRoutes };
