import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EmployeeModel } from './employee.model';
import { Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TaxDTO } from '../dto/TaxDTO';
import { OrderModel } from '../order/order.model';
import { OrderService } from '../order/order.service';

@Resolver(() => EmployeeModel)
export class EmployeeResolver {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(OrderService) private orderService: OrderService,
  ) {}

  @Query(() => EmployeeModel)
  async getEmployee(@Args('id') id: number): Promise<EmployeeModel> {
    return await this.employeeService.findOneById(id);
  }

  @ResolveField()
  orders(@Parent() employee: EmployeeModel): Promise<OrderModel[]> {
    return this.orderService.findAll(employee.employeeID, 'employee');
  }

  @Query(() => [EmployeeModel])
  async getBenefitsLeft(
    @Args('month', {
      type: () => Int,
      nullable: true,
      defaultValue: new Date().getMonth(),
    })
    month?: number,
  ): Promise<EmployeeModel[]> {
    return await this.employeeService.benefitsLeftToSpend(month);
  }

  @Query(() => [TaxDTO])
  spendPerMonth(
    @Args('company', {
      type: () => Int,
      nullable: false,
    })
    company: number,
    @Args('month', {
      type: () => Int,
      nullable: true,
      defaultValue: new Date().getMonth(),
    })
    month: number,
  ): Promise<TaxDTO[]> {
    return this.employeeService.spendPerMonth(month, company);
  }
}
