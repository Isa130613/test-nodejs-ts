import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';

export const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);
userRouter.post('/login', AuthController.login);
userRouter.get('/:id', UserController.getUserById);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);
