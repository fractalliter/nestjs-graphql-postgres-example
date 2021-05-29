import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RevenueDTO {
  @Field((type) => Float)
  revenue: number;

  @Field((type) => Int)
  partner: number;

  @Field()
  partnerName: string;
}
