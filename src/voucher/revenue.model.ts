import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RevenueModel {
  @Field()
  revenue: number;

  @Field()
  partner: number;

  @Field()
  partnerName: string;
}
