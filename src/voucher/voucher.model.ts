import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
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
}
