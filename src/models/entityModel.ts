import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import PermissionModel from './permissionModel';

@Table({
  tableName: 'entities',
  modelName: 'Entity',
  timestamps: false,
})
export default class EntityModel extends Model<EntityModel> {
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
}
