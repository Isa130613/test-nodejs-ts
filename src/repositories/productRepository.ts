import { injectable } from 'tsyringe';
import ProductModel from '../models/productModel';
import ProductType from '../interfaces/product';
import ProductCartModel from '../models/productCartModel';

@injectable()
export default class ProductRepository {
  async findAll(): Promise<ProductType[]> {
    return await ProductModel.findAll({ include: ProductCartModel });
  }

  async findById(id: number): Promise<ProductType | null> {
    return await ProductModel.findByPk(id);
  }

  async findManyByProductCartId(id: number) {
    return await ProductModel.findAll({
      where: { productsCarts: { id } },
      include: ProductCartModel,
    });
  }

  async create(product: Partial<ProductType>): Promise<ProductType> {
    return await ProductModel.create({
      ...product,
    } as ProductModel);
  }

  async update(
    id: number,
    product: Partial<ProductType>
  ): Promise<[affectedCount: number]> {
    return await ProductModel.update(product, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await ProductModel.destroy({ where: { id } });
  }
}
