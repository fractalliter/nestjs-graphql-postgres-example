import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
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
  @PrimaryColumn({ type: 'bigint', name: 'Order ID' })
  orderID: number;

  @Field()
  @Column({ name: 'Order Date' })
  orderDate: string;

  @Field(() => EmployeeModel, { nullable: false })
  @ManyToOne(() => EmployeeModel, (employee) => employee.employeeID)
  @JoinColumn({ name: 'Employee ID' })
  employee: EmployeeModel;

  @Field(() => VoucherModel, { nullable: false })
  @ManyToOne(() => VoucherModel, (voucher) => voucher.voucherID)
  @JoinColumn({ name: 'Voucher ID' })
  voucher: EmployeeModel;
}
