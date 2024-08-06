import { injectable } from 'tsyringe';
import UserModel from '../models/userModel';
import UserType from '../interfaces/user';
import RoleModel from '../models/roleModel';

@injectable()
export default class UserRepository {
  static async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll({ include: RoleModel });
  }

  static async findById(id: number) {
    return await UserModel.findByPk(id);
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

  static async update(id: number, user: Partial<UserModel>) {
    return await UserModel.update(user, { where: { id } });
  }

  static async delete(id: number) {
    return await UserModel.destroy({ where: { id } });
  }
}
