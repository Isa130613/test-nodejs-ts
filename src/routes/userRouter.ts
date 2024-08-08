import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';

export const userRouter = Router();

userRouter.get('/', UserController.getAllUsers); // admin
userRouter.post('/', UserController.createUser); // admin
userRouter.post('/login', AuthController.login); // any
userRouter.get('/:id', UserController.getUserById); // admin
userRouter.put('/:id', UserController.updateUser); // admin || userId === id
userRouter.delete('/:id', UserController.deleteUser); //admin || userId === id
