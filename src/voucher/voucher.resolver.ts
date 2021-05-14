import { Args, Query, Resolver } from '@nestjs/graphql';
import { VoucherModel } from './voucher.model';
import { Inject } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { RevenueModel } from './revenue.model';

@Resolver((of) => VoucherModel)
export class VoucherResolver {
  constructor(@Inject(VoucherService) private voucherService: VoucherService) {}

  @Query((returns) => VoucherModel)
  async getVoucher(@Args('id') id: number): Promise<VoucherModel> {
    return await this.voucherService.getVoucherById(id);
  }

  @Query((returns) => [RevenueModel])
  async getRevenue(): Promise<RevenueModel[]> {
    return await this.voucherService.revenuePerPartner();
  }
}
