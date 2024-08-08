import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserType from '../interfaces/user';
import AuthService from '../services/authService';

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const authService: AuthService = container.resolve(AuthService);

      const { email, password }: { email: string; password: string } = req.body;
      const userChecked: UserType | undefined =
        await authService.checkUserCredentials(email, password);

      if (!userChecked || !userChecked.id || !userChecked.roleId) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid credentials',
        });
      }

      const token = authService.generateToken({
        id: userChecked.id,
        roleId: userChecked.roleId,
      });

      res.status(200).json({
        status: 200,
        token,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
