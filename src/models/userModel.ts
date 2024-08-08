import {
  Table,
  Model,
  Column,
  AutoIncrement,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import RoleModel from './roleModel';
import CartModel from './cartModel';
import OrderModel from './orderModel';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: false,
})
export default class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'role_id',
  })
  roleId!: number;

  @BelongsTo(() => RoleModel)
  role!: RoleModel;

  @HasOne(() => CartModel)
  cart!: CartModel;

  @HasMany(() => OrderModel)
  orders!: OrderModel[];
}
