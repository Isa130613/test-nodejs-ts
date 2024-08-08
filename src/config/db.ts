import { resolve } from 'path';
import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import EntityModel from '../models/entityModel';
import PermissionModel from '../models/permissionModel';
import ProductModel from '../models/productModel';
import RoleModel from '../models/roleModel';
import UserModel from '../models/userModel';
import CartModel from '../models/cartModel';
import ProductCartModel from '../models/productCartModel';
import OrderModel from '../models/orderModel';

config({ path: resolve(__dirname, '../../.env') });

const username: string | undefined = process.env.DB_USER;
const password: string | undefined = process.env.DB_PASS;
const database: string | undefined = process.env.DB_NAME;
const host: string | undefined = process.env.DB_HOST;
const dialect: Dialect = 'mysql';

if (!username || !password || !database || !host) {
  throw new Error('Variables to establish connection to database not provided');
}

const sequelize: Sequelize = new Sequelize({
  dialect,
  host,
  username,
  password,
  database,
  models: [
    EntityModel,
    PermissionModel,
    ProductModel,
    RoleModel,
    UserModel,
    CartModel,
    ProductCartModel,
    OrderModel,
  ],
  logging: false,
});

export default sequelize;
