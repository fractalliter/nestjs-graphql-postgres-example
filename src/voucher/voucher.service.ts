import { Injectable } from '@nestjs/common';
import { VoucherModel } from './voucher.model';
import { RevenueModel } from './revenue.model';

@Injectable()
export class VoucherService {
  async getVoucherById(id: number): Promise<VoucherModel> {
    return await VoucherModel.findOne(id);
  }

  async revenuePerPartner(): Promise<RevenueModel[]> {
    return await VoucherModel.query(
      'select "Partner ID" as partner, sum("Voucher Amount") as revenue from public.vouchers group by "Partner ID"',
    );
  }
}
