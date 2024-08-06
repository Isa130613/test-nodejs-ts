import { Router } from 'express';
import { userRouter } from './userRouter';
import { productRouter } from './productRouter';

const router: Router = Router();
router.use('/users', userRouter);
router.use('/products', productRouter);

export default router;
