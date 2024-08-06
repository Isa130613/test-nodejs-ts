import UserModel from '../models/userModel';

const insertFirstAdmin = async (): Promise<void> => {
  const users: UserModel[] = await UserModel.findAll();
  if (users.length < 1) {
    await UserModel.create({
      email: 'admin.one@mail.uwu',
      password: 'password123',
      RoleId: 1,
    });
  }
};

export default insertFirstAdmin;
