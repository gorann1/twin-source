import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity({tableName:'koncar.users'})

export class User {
@Field(() => Int)
  @PrimaryKey()
  user_id!: number;

  @Field(() => String)
  @Property({ type: 'date'})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
  
  @Field()
  @Property({ type: 'text', unique: true})
  username!: string;

  @Property({ type: 'text'})
  password!: string;
  static user_id: number | undefined;
  
}