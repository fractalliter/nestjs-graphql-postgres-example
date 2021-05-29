import { Injectable } from '@nestjs/common';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  async getOrderById(id: number): Promise<OrderModel> {
    const res = await OrderModel.findOne(id);
    return await OrderModel.findOne(id);
  }

  findAll(id: number, field: string): Promise<OrderModel[]> {
    return OrderModel.find({ where: { [field]: id } });
  }
}
