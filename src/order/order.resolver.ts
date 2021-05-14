import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrderModel } from './order.model';
import { Inject } from '@nestjs/common';
import { OrderService } from './order.service';

@Resolver((of) => OrderModel)
export class OrderResolver {
  constructor(@Inject(OrderService) private orderService: OrderService) {}

  @Query((returns) => OrderModel)
  async getOrder(@Args('id') id: number): Promise<OrderModel> {
    return this.orderService.getOrderById(id);
  }
}
