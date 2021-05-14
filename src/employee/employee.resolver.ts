import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { EmployeeModel } from './employee.model';
import { Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Resolver(() => EmployeeModel)
export class EmployeeResolver {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @Query(() => EmployeeModel)
  async getEmployee(@Args('id') id: number): Promise<EmployeeModel> {
    return await this.employeeService.findOneById(id);
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
}
