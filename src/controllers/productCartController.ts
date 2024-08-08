import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CartModel from '../models/productCartModel';
import ProductCartType from '../interfaces/productCart';
import ProductCartService from '../services/productCartService';
import ExtendedRequest from '../interfaces/extendedRequest';

export default class ProductCartController {
  static async createProductCart(req: ExtendedRequest, res: Response) {
    try {
      const productCartBody: Partial<ProductCartType> = req.body;

      const productCartService: ProductCartService =
        container.resolve(ProductCartService);

      console.log({ user: req.user });

      const productCart: ProductCartType | null =
        await productCartService.createProductCart(
          productCartBody,
          req.user.id
        );

      if (!productCart) {
        throw new Error('Fields invalid');
      }
      res.status(200).json({
        message: 'product added to cart successfully',
        productCart,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async updateProductCart(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const productCart: Partial<CartModel> = req.body;
    try {
      const productService: ProductCartService =
        container.resolve(ProductCartService);
      const [affectedCount]: number[] = await productService.updateProductCart(
        id,
        { quantity: productCart.quantity }
      );

      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Product not found in cart',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Product in cart updated successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async deleteProductCart(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const productService: ProductCartService =
      container.resolve(ProductCartService);
    try {
      const affectedCount: number = await productService.deleteProductCart(id);
      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Product not found in cart',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Product deleted successfully from cart',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}
