import User from '@modules/users/prisma/entities/User';
import { Field, ID, ObjectType } from 'type-graphql';
import { User as UserP } from '@prisma/client';

@ObjectType()
export default class Profession {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  user_id!: string;

  @Field(() => User)
  user!: UserP;

  @Field(() => Date)
  created_at!: Date;

  @Field(() => Date)
  updated_at!: Date;
}
