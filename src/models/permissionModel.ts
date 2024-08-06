import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import RoleModel from './roleModel';
import EntityModel from './entityModel';

export default class PermissionModel extends Model {}

PermissionModel.init(
  {
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: RoleModel,
        key: 'id',
      },
    },
    EntityId: {
      type: DataTypes.INTEGER,
      references: {
        model: EntityModel,
        key: 'id',
      },
    },
    canCreate: {
      type: DataTypes.BOOLEAN,
    },
    canUpdate: {
      type: DataTypes.BOOLEAN,
    },
    canDelete: {
      type: DataTypes.BOOLEAN,
    },
    canGet: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'Permissions',
    tableName: 'permissions',
    timestamps: false,
  }
);
