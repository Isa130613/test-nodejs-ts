import RoleModel from '../models/roleModel';
import UserModel from '../models/userModel';

const insertFirstAdmin = async (): Promise<void> => {
  const users: UserModel[] = await UserModel.findAll();
  if (users.length < 1) {
    await UserModel.create(
      {
        email: 'admin.one@mail.uwu',
        password: 'password123',
        roleId: 1,
      } as UserModel,
      { include: RoleModel }
    );
  }
};

export default insertFirstAdmin;
