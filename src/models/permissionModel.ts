import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import RoleModel from './roleModel';
import EntityModel from './entityModel';

@Table({
  tableName: 'permissions',
  modelName: 'Permission',
  timestamps: false,
})
export default class PermissionModel extends Model<PermissionModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'can_create',
    allowNull: false,
  })
  canCreate!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'can_update',
    allowNull: false,
  })
  canUpdate!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'can_delete',
    allowNull: false,
  })
  canDelete!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'can_get',
    allowNull: false,
  })
  canGet!: boolean;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'role_id',
  })
  roleId!: number;

  @BelongsTo(() => RoleModel)
  role!: RoleModel;

  @ForeignKey(() => EntityModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'entity_id',
  })
  entityId!: number;

  @BelongsTo(() => EntityModel)
  entity!: EntityModel;
}
