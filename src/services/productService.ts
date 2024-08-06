import { injectable } from 'tsyringe';
import ProductModel from '../models/productModel';
import ProductType from '../interfaces/product';
import ProductRepository from '../repositories/productRepository';

@injectable()
export default class ProductService {
  productRepository = ProductRepository;

  async getAllProducts(): Promise<ProductModel[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<ProductModel | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(
    product: Partial<ProductType>
  ): Promise<ProductModel | null> {
    return await this.productRepository.create(product);
  }

  async updateProduct(
    id: number,
    product: Partial<ProductModel>
  ): Promise<[affectedCount: number]> {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<number> {
    return await this.productRepository.delete(id);
  }
}
