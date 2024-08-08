import { injectable } from 'tsyringe';
import OrderModel from '../models/orderModel';
import OrderType from '../interfaces/order';
import ProductCartModel from '../models/productCartModel';

@injectable()
export default class OrderRepository {
  async findAll(): Promise<OrderType[]> {
    return await OrderModel.findAll({ include: ProductCartModel });
  }

  async findByUserId(id: number): Promise<OrderType | null> {
    return await OrderModel.findByPk(id);
  }

  async create(order: Partial<OrderType>): Promise<OrderType | null> {
    return await OrderModel.create(order as OrderModel, {
      include: ProductCartModel,
    });
  }

  async update(
    id: number,
    order: Partial<OrderType>
  ): Promise<[affectedCount: number]> {
    return await OrderModel.update(order as OrderModel, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await OrderModel.destroy({ where: { id } });
  }
}
