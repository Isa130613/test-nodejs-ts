import { inject, injectable } from 'tsyringe';
import OrderType from '../interfaces/order';
import OrderRepository from '../repositories/orderRepository';
import ProductRepository from '../repositories/productRepository';
import ProductCartRepository from '../repositories/productCartRepository';

@injectable()
export default class OrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @inject('ProductCartRepository')
    private readonly productCartRepository: ProductCartRepository
  ) {}

  async getAllOrders(): Promise<OrderType[]> {
    return await this.orderRepository.findAll();
  }

  async getOrderByUserId(id: number): Promise<OrderType | null> {
    return await this.orderRepository.findByUserId(id);
  }

  async createOrder(order: Partial<OrderType>): Promise<OrderType | null> {
    const newOrder: OrderType | null = await this.orderRepository.create(order);

    if (newOrder && newOrder.productCartId) {
      const productCart = await this.productCartRepository.findById(
        newOrder.productCartId
      );
      if (productCart && productCart.productId) {
        await this.productRepository.update(productCart.productId, {
          stock: productCart.product.stock - productCart.quantity,
        });
      }
    }

    return newOrder;
  }

  async updateOrder(
    id: number,
    order: Partial<OrderType>
  ): Promise<[affectedCount: number]> {
    return await this.orderRepository.update(id, order);
  }

  async deleteOrder(id: number): Promise<number> {
    return await this.orderRepository.delete(id);
  }
}
