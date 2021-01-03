<<<<<<< HEAD
import { Connection } from "@mikro-orm/core/connections";
import { IDatabaseDriver } from "@mikro-orm/core/drivers";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { Request, Response} from 'express';

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
<<<<<<< HEAD
  req: Request;
  res: Response;
=======
  res: Response;
  req: Request & { session: Express.Session };
>>>>>>> dev

=======
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session } from "express-session";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
>>>>>>> dev
};