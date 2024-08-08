import { container } from 'tsyringe';
import { Request, Response } from 'express';
import OrderModel from '../models/orderModel';
import OrderType from '../interfaces/order';
import OrderService from '../services/orderService';
import ExtendedRequest from '../interfaces/extendedRequest';

export default class OrderController {
  static async createOrder(req: ExtendedRequest, res: Response) {
    try {
      const orderBody: Partial<OrderType> = req.body;

      const orderService: OrderService = container.resolve(OrderService);

      console.log({ user: req.user });

      const order: OrderType | null = await orderService.createOrder({
        ...orderBody,
        userId: req.user.id,
      });

      if (!order) {
        throw new Error('Fields invalid');
      }
      res.status(200).json({
        message: 'order created successfully',
        order,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async getOrderByUserId(req: Request, res: Response) {
    try {
      const orderService: OrderService = container.resolve(OrderService);
      const id: number = parseInt(req.params.id);
      const product: OrderType | null = await orderService.getOrderByUserId(id);

      if (!product) {
        res.status(404).json({
          status: 404,
          message: 'Orders not found',
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

  static async updateOrder(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const {
      productCartId,
      productCart,
      user,
      userId,
      ...order
    }: Partial<OrderModel> = req.body;
    try {
      const orderService: OrderService = container.resolve(OrderService);
      const [affectedCount]: number[] = await orderService.updateOrder(id, {
        ...order,
      });

      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Product not found in cart',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Order updated successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const orderService: OrderService = container.resolve(OrderService);
    try {
      const affectedCount: number = await orderService.deleteOrder(id);
      if (affectedCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Order deleted successfully',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}
