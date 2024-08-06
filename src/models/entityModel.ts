import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import PermissionModel from './permissionModel';
import RoleModel from './roleModel';

export default class EntityModel extends Model {
  //   @PrimaryKey()
  //   @AutoIncrement
  //   @Column({
  //     type: DataType.INTEGER,
  //   })
  //   id!: number;
  //   @Column({ type: DataType.STRING })
  //   name!: string;
}

EntityModel.init(
  {
    name: {
      type: DataTypes.STRING(200),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Entity',
    tableName: 'entities',
    timestamps: false,
  }
);
