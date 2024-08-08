import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ProductCart from './productCartModel';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: false,
})
export default class ProductModel extends Model<ProductModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock!: number;

  @HasMany(() => ProductCart)
  productsCarts!: ProductCart[];
}
