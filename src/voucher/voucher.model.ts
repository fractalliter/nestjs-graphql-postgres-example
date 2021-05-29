import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrderModel } from '../order/order.model';

@ObjectType('Voucher')
@Entity({
  name: 'vouchers',
})
export class VoucherModel extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: 'bigint', name: 'Voucher ID' })
  voucherID: number;

  @Field()
  @Column({ type: 'real', name: 'Voucher Amount' })
  voucherAmount: number;

  @Field()
  @Column({ name: 'Partner ID' })
  partnerID: number;

  @Field()
  @Column({ name: 'Partner Name' })
  partnerName: string;

  @Field(() => [OrderModel])
  orders: OrderModel[];
}
