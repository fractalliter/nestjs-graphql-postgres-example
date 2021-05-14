import { Args, Query, Resolver } from '@nestjs/graphql';
import { EmployeeModel } from './employee.model';
import { Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Resolver((of) => EmployeeModel)
export class EmployeeResolver {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @Query((returns) => EmployeeModel)
  async getEmployee(@Args('id') id: number): Promise<EmployeeModel> {
    return await this.employeeService.findOneById(id);
  }
}
