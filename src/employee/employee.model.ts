import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OrderModel } from '../order/order.model';

@ObjectType('Employee')
@Entity({
  name: 'employees',
})
export class EmployeeModel extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn({ name: 'Employee ID' })
  employeeID: number;

  @Field()
  @Column({ length: 280, nullable: false, name: 'Employee Name' })
  employeeName: string;

  @Field(() => Float)
  @Column({ name: 'Monthly Budget' })
  monthlyBudget: number;

  @Field(() => Int)
  @Column({
    name: 'Company ID',
  })
  companyID: number;

  @Field()
  @Column({ length: 280, name: 'Company Title' })
  companyTitle: string;

  @Field(() => [OrderModel])
  orders: OrderModel[];
}
