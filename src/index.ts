import 'reflect-metadata';
import './config/container';
import express, { Application } from 'express';
import sequelize from './config/db';
import insertPermissions from './seeds/insertPermissions';
import router from './routes/router';
import insertFirstAdmin from './seeds/insertFirstAdmin';
import checkPermissions from './middlewares/checkPermissions';

const app: Application = express();
app.use(express.json());
app.use('/api', checkPermissions, router);

const PORT: number | string = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await insertPermissions();
    await insertFirstAdmin();

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
