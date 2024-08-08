import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CartModel from './cartModel';
import ProductModel from './productModel';
import OrderModel from './orderModel';

@Table({
  tableName: 'products_cards',
  modelName: 'ProductCart',
  timestamps: false,
})
export default class ProductCartModel extends Model<ProductCartModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @ForeignKey(() => CartModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'carts_id',
  })
  cartId!: number;

  @BelongsTo(() => CartModel)
  cart!: CartModel;

  @ForeignKey(() => ProductModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'products_id',
  })
  productId!: number;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;

  @HasMany(() => OrderModel)
  orders!: OrderModel[];
}
