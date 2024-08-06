import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export default class RoleModel extends Model {}

RoleModel.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: false,
  }
);
