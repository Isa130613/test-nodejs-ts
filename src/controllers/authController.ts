import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from '../services/userService';

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const userService: UserService = container.resolve(UserService);
      const { email, password }: { email: string; password: string } = req.body;
      const userChecked = await userService.checkUserCredentials(
        email,
        password
      );

      if (!userChecked) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid credentials',
        });
      }
      console.log('Login successful :D');
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
