import { EmployeeModel } from './employee.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaxModel extends EmployeeModel {
  @Field()
  total: number;

  @Field()
  tax: number;

  @Field()
  monthly: number;
}
