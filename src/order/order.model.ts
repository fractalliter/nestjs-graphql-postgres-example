import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { EmployeeModel } from '../employee/employee.model';
import { VoucherModel } from '../voucher/voucher.model';

@ObjectType('Orders')
@Entity({
  name: 'orders',
})
export class OrderModel extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn({ type: 'bigint', name: 'Order ID' })
  orderID: number;

  @Field()
  @Column({ name: 'Order Date' })
  orderDate: string;

  @Field((type) => EmployeeModel, { nullable: false })
  @ManyToOne(() => EmployeeModel, (employee) => employee.employeeID, {
    eager: true,
  })
  @JoinColumn({ name: 'Employee ID', referencedColumnName: 'employeeID' })
  employee: EmployeeModel;

  @Field(() => VoucherModel, { nullable: false })
  @ManyToOne(() => VoucherModel, (voucher) => voucher.voucherID, {
    eager: true,
  })
  @JoinColumn({ name: 'Voucher ID', referencedColumnName: 'voucherID' })
  voucher: VoucherModel;
}
