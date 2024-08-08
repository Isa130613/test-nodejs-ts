import { Router } from 'express';
import ProductCartController from '../controllers/productCartController';

export const productCartRouter = Router();

productCartRouter.post('/', ProductCartController.createProductCart);
productCartRouter.put('/:id', ProductCartController.updateProductCart);
productCartRouter.delete('/:id', ProductCartController.deleteProductCart);
