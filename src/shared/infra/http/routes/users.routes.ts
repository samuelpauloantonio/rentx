import express from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { UserController } from '@modules/accounts/useCases/createUserController';
import { UpdateUserAvaterController } from '@modules/accounts/useCases/UpdateUseAvatar/updateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/profileUserController';

const userController = new UserController();
const updateUseAvatarController = new UpdateUserAvaterController();
const profileUseController = new ProfileUserController();

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

userRoutes.get('/profile', ensureAuthenticated, profileUseController.handle);

export { userRoutes };
