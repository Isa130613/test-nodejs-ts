import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import RoleModel from './roleModel';

export default class UserModel extends Model {}

UserModel.init(
  {
    email: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: RoleModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
  }
);
