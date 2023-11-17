import Profession from '@modules/professions/prisma/entities/Profession';
import { Field, ID, ObjectType } from 'type-graphql';
import { Profession as ProfessionP } from '@prisma/client';

@ObjectType()
export default class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  age!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Profession, { nullable: true })
  profession?: ProfessionP;

  @Field(() => Boolean, { defaultValue: true })
  is_active!: boolean;

  @Field(() => Date)
  created_at!: Date;

  @Field(() => Date)
  updated_at!: Date;
}
