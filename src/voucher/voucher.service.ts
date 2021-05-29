import { Injectable } from '@nestjs/common';
import { VoucherModel } from './voucher.model';
import { RevenueDTO } from '../dto/RevenueDTO';

@Injectable()
export class VoucherService {
  getVoucherById(id: number): Promise<VoucherModel> {
    return VoucherModel.findOne(id);
  }

  revenuePerPartner(): Promise<RevenueDTO[]> {
    return VoucherModel.query(`
            select
               "Partner ID" as partner,
               "Partner Name" as "partnerName",
               sum("Voucher Amount") as revenue
            from public.vouchers
                left join orders using("Voucher ID")
            group by partner, "partnerName"
            order by revenue DESC
    `);
  }
}
