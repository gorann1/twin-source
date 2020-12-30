import { Connection } from "@mikro-orm/core/connections";
import { IDatabaseDriver } from "@mikro-orm/core/drivers";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { Request, Response} from 'express';

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  req: Request;
  res: Response;

};