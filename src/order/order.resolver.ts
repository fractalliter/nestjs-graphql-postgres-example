import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderModel } from './order.model';
import { Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { VoucherModel } from '../voucher/voucher.model';
import { VoucherService } from '../voucher/voucher.service';

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(
    @Inject(OrderService) private orderService: OrderService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(VoucherService) private voucherService: VoucherService,
  ) {}

  @Query(() => OrderModel)
  getOrder(@Args('id') id: number): Promise<OrderModel> {
    return this.orderService.getOrderById(id);
  }

  @ResolveField()
  employee(@Parent() employee: EmployeeModel): Promise<EmployeeModel> {
    return this.employeeService.findOneById(employee.employeeID);
  }

  @ResolveField()
  voucher(@Parent() voucher: VoucherModel): Promise<VoucherModel> {
    return this.voucherService.getVoucherById(voucher.voucherID);
  }
}
