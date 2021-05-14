import { Injectable } from '@nestjs/common';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  async getOrderById(id: number): Promise<OrderModel> {
    return await OrderModel.findOne(id);
  }
}
