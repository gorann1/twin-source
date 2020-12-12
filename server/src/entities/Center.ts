import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({tableName:'koncar.Center'})

export class Center {
  @PrimaryKey()
  id!: number;

  @Property({ type:'text'})
  name!: string;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
  
}