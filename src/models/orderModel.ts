import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ProductCartModel from './productCartModel';
import UserModel from './userModel';

@Table({
  tableName: 'orders',
  modelName: 'Order',
  timestamps: false,
})
export default class OrderModel extends Model<OrderModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total!: number;

  @ForeignKey(() => ProductCartModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'products_cards_id',
  })
  productCartId!: number;

  @BelongsTo(() => ProductCartModel)
  productCart!: ProductCartModel;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'users_id',
  })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;
}
