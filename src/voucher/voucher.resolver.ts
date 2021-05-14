import { Args, Query, Resolver } from '@nestjs/graphql';
import { VoucherModel } from './voucher.model';
import { Inject } from '@nestjs/common';
import { VoucherService } from './voucher.service';

@Resolver((of) => VoucherModel)
export class VoucherResolver {
  constructor(@Inject(VoucherService) private voucherService: VoucherService) {}

  @Query((returns) => VoucherModel)
  async getVoucher(@Args('id') id: number): Promise<VoucherModel> {
    return await this.voucherService.getVoucherById(id);
  }
}
