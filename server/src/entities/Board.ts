import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName:'koncar.boards'})

export class Board {
  @PrimaryKey()
  board_id!: number;

  @Property({ type:'text'})
  first_name!: string;

  @Property({ type:'text'})
  last_name!: string;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
  
}