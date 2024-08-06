import UserService from '../services/userService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import UserType from '../interfaces/user';

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const userBody: Partial<UserType> = req.body;

      const userService: UserService = container.resolve(UserService);
      console.log(userService);

      const user: UserModel | null = await userService.createUser(
        userBody,
        userBody.roleId || 2
      );
      res.status(200).json({
        message: 'user created successfully',
        user,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const userService: UserService = container.resolve(UserService);
      const users: UserModel[] = await userService.getAllUsers();
      res.status(200).json({
        status: 200,
        users: users,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userService: UserService = container.resolve(UserService);
      const id: number = parseInt(req.params.id);
      const user: UserModel | null = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({
          status: 404,
          message: 'User not found',
        });
        return;
      }
      //    user.password = '';
      res.status(200).json({
        status: 200,
        user,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const user: Partial<UserModel> = req.body;
    try {
      const userService: UserService = container.resolve(UserService);
      const [affectedCount]: number[] = await userService.updateUser(id, user);
      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'User updated successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const userService: UserService = container.resolve(UserService);
    try {
      const affectedCount: number = await userService.deleteUser(id);
      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'User deleted successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}
