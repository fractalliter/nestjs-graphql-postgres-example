import { Injectable } from '@nestjs/common';
import { VoucherModel } from './voucher.model';

@Injectable()
export class VoucherService {
  async getVoucherById(id: number): Promise<VoucherModel> {
    return await VoucherModel.findOne(id);
  }
}
