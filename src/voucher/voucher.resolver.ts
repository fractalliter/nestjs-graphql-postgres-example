import { Args, Query, Resolver } from '@nestjs/graphql';
import { VoucherModel } from './voucher.model';
import { Inject } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { RevenueModel } from './revenue.model';

@Resolver(() => VoucherModel)
export class VoucherResolver {
  constructor(@Inject(VoucherService) private voucherService: VoucherService) {}

  @Query(() => VoucherModel)
  async getVoucher(@Args('id') id: number): Promise<VoucherModel> {
    return await this.voucherService.getVoucherById(id);
  }

  @Query(() => [RevenueModel])
  async getRevenue(): Promise<RevenueModel[]> {
    return await this.voucherService.revenuePerPartner();
  }
}
