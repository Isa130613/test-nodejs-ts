import { inject, injectable } from 'tsyringe';
import ProductType from '../interfaces/product';
import ProductRepository from '../repositories/productRepository';

@injectable()
export default class ProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async getAllProducts(): Promise<ProductType[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<ProductType | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(
    product: Partial<ProductType>
  ): Promise<ProductType | null> {
    return await this.productRepository.create(product);
  }

  async updateProduct(
    id: number,
    product: Partial<ProductType>
  ): Promise<[affectedCount: number]> {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<number> {
    return await this.productRepository.delete(id);
  }
}
