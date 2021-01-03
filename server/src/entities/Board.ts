import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity({tableName:'koncar.boards'})

export class Board {
@Field(() => Int)
  @PrimaryKey()
  board_id!: number;

  @Field(() => String)
  @Property({ type:'text'})
  first_name!: string;

  @Field(() => String)
  @Property({ type:'text'})
  last_name!: string;

  @Field(() => String)
  @Property({ type: 'date'})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()
<<<<<<< HEAD
   
=======
  
>>>>>>> dev
}