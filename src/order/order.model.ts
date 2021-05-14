import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeModel } from '../employee/employee.model';
import { VoucherModel } from '../voucher/voucher.model';

@ObjectType()
@Entity({
  name: 'orders',
})
export class OrderModel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'Order ID' })
  orderID: number;

  @Field()
  @Column({ name: 'Order Date' })
  orderDate: string;

  @Field((type) => EmployeeModel, { nullable: false })
  @ManyToOne((type) => EmployeeModel, (employee) => employee.employeeID)
  @JoinColumn({ name: 'Employee ID' })
  employee: EmployeeModel;

  @Field((type) => VoucherModel, { nullable: false })
  @ManyToOne((type) => VoucherModel, (voucher) => voucher.voucherID)
  @JoinColumn({ name: 'Voucher ID' })
  voucher: EmployeeModel;
}
