import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EmployeeModel } from '../employee/employee.model';

@ObjectType()
export class TaxDTO extends EmployeeModel {
  @Field((type) => Int)
  total: number;

  @Field((type) => Int)
  tax: number;

  @Field((type) => Int)
  monthly: number;
}
