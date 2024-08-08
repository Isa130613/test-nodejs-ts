import { injectable } from 'tsyringe';
import ProductCartModel from '../models/productCartModel';
import ProductCartType from '../interfaces/productCart';
import CartModel from '../models/cartModel';
import CartType from '../interfaces/cart';

@injectable()
export default class ProductCartRepository {
  async findById(id: number): Promise<ProductCartType | null> {
    return await ProductCartModel.findByPk(id);
  }

  async searchCartByUserId(userId: number): Promise<CartType | null> {
    return await CartModel.findOne({ where: { userId } });
  }

  async create(
    productCart: Partial<ProductCartType>
  ): Promise<ProductCartType> {
    return await ProductCartModel.create(productCart as ProductCartModel, {
      include: CartModel,
    });
  }

  async update(
    id: number,
    productCart: Partial<ProductCartType>
  ): Promise<[affectedCount: number]> {
    return await ProductCartModel.update(productCart, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await ProductCartModel.destroy({ where: { id } });
  }
}
