import { injectable } from 'tsyringe';
import UserModel from '../models/userModel';
import UserType from '../interfaces/user';
import RoleModel from '../models/roleModel';

@injectable()
export default class UserRepository {
  static async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll({ include: RoleModel });
  }

  static async findById(id: number): Promise<UserModel | null> {
    return await UserModel.findByPk(id);
  }

  static async findByEmail(email: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { email } });
  }

  static async create(
    user: Partial<UserType>,
    roleId: number
  ): Promise<UserModel> {
    return await UserModel.create({
      ...user,
      RoleId: roleId,
    });
  }

  static async update(
    id: number,
    user: Partial<UserModel>
  ): Promise<[affectedCount: number]> {
    return await UserModel.update(user, { where: { id } });
  }

  static async delete(id: number): Promise<number> {
    return await UserModel.destroy({ where: { id } });
  }
}
