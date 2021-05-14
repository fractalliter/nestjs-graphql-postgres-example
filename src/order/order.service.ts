import { Injectable } from '@nestjs/common';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  async getOrderById(id: number): Promise<OrderModel> {
    console.log(await OrderModel.findOne(id));
    return await OrderModel.findOne(id);
  }
}
