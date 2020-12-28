import { Connection } from "@mikro-orm/core/connections";
import { IDatabaseDriver } from "@mikro-orm/core/drivers";
import { EntityManager } from "@mikro-orm/core/EntityManager";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>

};