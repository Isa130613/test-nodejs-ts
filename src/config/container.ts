import { container } from 'tsyringe';
import UserRepository from '../repositories/userRepository';
import UserService from '../services/userService';
import AuthService from '../services/authService';
import ProductRepository from '../repositories/productRepository';
import ProductService from '../services/productService';
import ProductCartRepository from '../repositories/productCartRepository';
import ProductCartService from '../services/productCartService';
import OrderRepository from '../repositories/orderRepository';
import OrderService from '../services/orderService';

container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<UserService>('UserService', UserService);

container.registerSingleton<AuthService>('AuthService', AuthService);

container.registerSingleton<ProductRepository>(
  'ProductRepository',
  ProductRepository
);
container.registerSingleton<ProductService>('ProductService', ProductService);

container.registerSingleton<ProductCartRepository>(
  'ProductCartRepository',
  ProductCartRepository
);
container.registerSingleton<ProductCartService>(
  'ProductCartService',
  ProductCartService
);

container.registerSingleton<OrderRepository>(
  'OrderRepository',
  OrderRepository
);
container.registerSingleton<OrderService>('OrderService', OrderService);
