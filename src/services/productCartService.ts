import { inject, injectable } from 'tsyringe';
import ProductCartType from '../interfaces/productCart';
import ProductCartRepository from '../repositories/productCartRepository';
import CartType from '../interfaces/cart';

@injectable()
export default class ProductCartService {
  constructor(
    @inject('ProductCartRepository')
    private readonly productCartRepository: ProductCartRepository
  ) {}

  async createProductCart(
    productCart: Partial<ProductCartType>,
    userId: number
  ): Promise<ProductCartType | null> {
    const cart: CartType | null =
      await this.productCartRepository.searchCartByUserId(userId);
    if (!cart) {
      return null;
    }
    return await this.productCartRepository.create({
      ...productCart,
      cartId: cart.id,
    });
  }

  async updateProductCart(
    id: number,
    productCart: Partial<ProductCartType>
  ): Promise<[affectedCount: number]> {
    return await this.productCartRepository.update(id, productCart);
  }

  async deleteProductCart(id: number): Promise<number> {
    return await this.productCartRepository.delete(id);
  }
}
