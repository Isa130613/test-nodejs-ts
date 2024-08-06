import UserRepository from '../repositories/userRepository';
import { injectable } from 'tsyringe';
import UserModel from '../models/userModel';
import UserType from '../interfaces/user';

@injectable()
export default class UserService {
  userRepository = UserRepository;

  async getAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserModel | null> {
    return await this.userRepository.findById(id);
  }

  async createUser(
    user: Partial<UserType>,
    roleId: number
  ): Promise<UserModel | null> {
    return await this.userRepository.create(user, roleId);
  }

  async updateUser(
    id: number,
    user: Partial<UserModel>
  ): Promise<[affectedCount: number]> {
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }

  async checkUserCredentials(
    email: string,
    password: string
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user?.dataValues.password === password;
  }
}
