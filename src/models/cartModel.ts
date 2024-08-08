import {
  Table,
  Model,
  Column,
  AutoIncrement,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import UserModel from './userModel';
import ProductCart from './productCartModel';

@Table({
  tableName: 'carts',
  modelName: 'Cart',
  timestamps: false,
})
export default class CartModel extends Model<CartModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @HasMany(() => ProductCart)
  productsCarts!: ProductCart[];
}
