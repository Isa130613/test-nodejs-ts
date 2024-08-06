import { resolve } from 'path';
import { config } from 'dotenv';
import { Model, Sequelize } from 'sequelize';
import { Dialect } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

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
});

export default sequelize;
