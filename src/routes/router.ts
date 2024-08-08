import { Router } from 'express';
import { userRouter } from './userRouter';
import { productRouter } from './productRouter';
import { productCartRouter } from './productCartRouter';
import { orderRouter } from './orderRouter';

const router: Router = Router();
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/products-carts', productCartRouter);
router.use('/orders', orderRouter);

export default router;
