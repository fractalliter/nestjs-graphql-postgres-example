import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { VoucherModel } from './voucher.model';
import { Inject } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { RevenueDTO } from '../dto/RevenueDTO';
import { OrderModel } from '../order/order.model';
import { OrderService } from '../order/order.service';

@Resolver(() => VoucherModel)
export class VoucherResolver {
  constructor(
    @Inject(VoucherService) private voucherService: VoucherService,
    @Inject(OrderService) private orderService: OrderService,
  ) {}

  @Query(() => VoucherModel)
  async getVoucher(@Args('id') id: number): Promise<VoucherModel> {
    return await this.voucherService.getVoucherById(id);
  }

  @Query(() => [RevenueDTO])
  getRevenue(): Promise<RevenueDTO[]> {
    return this.voucherService.revenuePerPartner();
  }

  @ResolveField()
  orders(voucher: VoucherModel): Promise<OrderModel[]> {
    return this.orderService.findAll(voucher.voucherID, 'voucher');
  }
}
