import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { VoucherModel } from './voucher/voucher.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoucherService } from './voucher/voucher.service';
import { RevenueDTO } from './dto/RevenueDTO';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private voucherService: VoucherService,
  ) {}

  @Get()
  getHello(): Promise<RevenueDTO[]> {
    // return this.appService.getHello();
    return this.voucherService.revenuePerPartner();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.buffer.toString());
    return null;
  }
}
