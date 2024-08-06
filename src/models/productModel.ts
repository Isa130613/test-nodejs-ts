import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export default class ProductModel extends Model {}

ProductModel.init(
  {
    name: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
  }
);
