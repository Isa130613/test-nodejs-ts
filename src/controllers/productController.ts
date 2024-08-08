import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ProductType from '../interfaces/product';
import ProductService from '../services/productService';

export default class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const productBody: Partial<ProductType> = req.body;

      const productService: ProductService = container.resolve(ProductService);

      const product: ProductType | null = await productService.createProduct(
        productBody
      );

      if (!product) {
        throw new Error('Fields invalid');
      }
      res.status(200).json({
        message: 'product created successfully',
        product,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async getAllProducts(_: Request, res: Response) {
    try {
      const productService: ProductService = container.resolve(ProductService);
      const products: ProductType[] = await productService.getAllProducts();
      res.status(200).json({
        status: 200,
        products,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const productService: ProductService = container.resolve(ProductService);
      const id: number = parseInt(req.params.id);
      const product: ProductType | null = await productService.getProductById(
        id
      );

      if (!product) {
        res.status(404).json({
          status: 404,
          message: 'Product not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        product,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const paramId: number = parseInt(req.params.id);
    const { id, ...product }: ProductType = req.body;
    try {
      const productService: ProductService = container.resolve(ProductService);
      const [affectedCount]: number[] = await productService.updateProduct(
        paramId,
        product
      );

      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Product not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Product updated successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const productService: ProductService = container.resolve(ProductService);
    try {
      const affectedCount: number = await productService.deleteProduct(id);
      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Product not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Product deleted successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}
