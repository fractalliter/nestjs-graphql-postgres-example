import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType('User')
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryColumn({ type: 'bigint', name: 'userID' })
  userId: number;

  @Field()
  userName: string;

  @Field({ nullable: true })
  fullName: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  birthDate: Date;
}
