import { injectable } from 'tsyringe';
import UserModel from '../models/userModel';
import UserType from '../interfaces/user';
import RoleModel from '../models/roleModel';
import CartModel from '../models/cartModel';

@injectable()
export default class UserRepository {
  async findAll(): Promise<UserType[]> {
    return await UserModel.findAll({ include: RoleModel });
  }

  async findById(id: number): Promise<UserType | null> {
    return await UserModel.findByPk(id, { include: RoleModel });
  }

  async findByEmail(email: string): Promise<UserType | null> {
    return await UserModel.findOne({ where: { email } });
  }

  async create(user: Partial<UserType>, roleId: number): Promise<UserType> {
    const newUser: UserModel = await UserModel.create(
      {
        ...user,
        roleId,
      } as UserModel,
      { include: RoleModel }
    );
    if (roleId === 2) {
      const cart = await CartModel.create({ userId: newUser.id } as CartModel, {
        include: UserModel,
      });
      console.log({ cart });
    }

    return newUser;
  }

  async update(
    id: number,
    user: Partial<UserType>
  ): Promise<[affectedCount: number]> {
    return await UserModel.update(user, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await UserModel.destroy({ where: { id } });
  }
}
