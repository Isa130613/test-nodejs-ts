import { injectable } from 'tsyringe';
import ProductModel from '../models/productModel';
import RoleModel from '../models/roleModel';
import ProductType from '../interfaces/product';

@injectable()
export default class ProductRepository {
  static async findAll(): Promise<ProductModel[]> {
    return await ProductModel.findAll({ include: RoleModel });
  }

  static async findById(id: number) {
    return await ProductModel.findByPk(id);
  }

  static async create(product: Partial<ProductType>): Promise<ProductModel> {
    return await ProductModel.create({
      ...product,
    });
  }

  static async update(id: number, product: Partial<ProductModel>) {
    return await ProductModel.update(product, { where: { id } });
  }

  static async delete(id: number) {
    return await ProductModel.destroy({ where: { id } });
  }
}
