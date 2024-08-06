import express, { Application } from 'express';
import 'reflect-metadata';
import sequelize from './config/db';
import insertPermissions from './seeds/insertPermissions';
import loadRelationships from './models/loadRelationships';
import router from './routes/router';
import insertFirstAdmin from './seeds/insertFirstAdmin';

const app: Application = express();
app.use(express.json());
app.use('/api', router);

const PORT: number | string = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    loadRelationships();
    await sequelize.sync({ force: true });
    await insertPermissions();
    await insertFirstAdmin();

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error starting server: ${error}`);
  }
};

startServer();
