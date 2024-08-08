import UserRepository from '../repositories/userRepository';
import { inject, injectable } from 'tsyringe';
import UserType from '../interfaces/user';

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<UserType[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserType | null> {
    return await this.userRepository.findById(id);
  }

  async createUser(
    user: Partial<UserType>,
    roleId: number
  ): Promise<UserType | null> {
    return await this.userRepository.create(user, roleId);
  }

  async updateUser(
    id: number,
    user: Partial<UserType>
  ): Promise<[affectedCount: number]> {
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }
}
