import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({
  name: 'employees',
})
export class EmployeeModel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'Employee ID' })
  employeeID: number;

  @Field()
  @Column({ length: 280, nullable: false, name: 'Employee Name' })
  employeeName: string;

  @Field()
  @Column({ name: 'Monthly Budget' })
  monthlyBudget: number;

  @Field()
  @Column({
    name: 'Company ID',
  })
  companyID: number;

  @Field()
  @Column({ length: 280, name: 'Company Title' })
  companyTitle: string;
}
