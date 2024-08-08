import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import PermissionModel from './permissionModel';
import UserModel from './userModel';

@Table({
  tableName: 'roles',
  modelName: 'Role',
  timestamps: false,
})
export default class RoleModel extends Model<RoleModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => PermissionModel)
  permissions!: PermissionModel[];

  @HasMany(() => UserModel)
  users!: UserModel[];
}
