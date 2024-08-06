import { container } from 'tsyringe';
import UserRepository from '../repositories/userRepository';
import UserService from '../services/userService';

container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<UserService>('UserService', UserService);
