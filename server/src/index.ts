import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { BoardResolver } from './resolvers/board';
import { UserResolver } from './resolvers/user';
//import redis from 'redis'
//import session from 'express-session'

//import connectRedis from 'connect-redis'
import { MyContext } from './types';
// Use REDIS but later I will change to PG & postgresql

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();

/*   let RedisStore = connectRedis(session)
  let redisClient = redis.createClient() */


/*   app.use(
    session({
      name: 'qid',
      store: new RedisStore({
         client: redisClient,
         disableTouch: true, 
        }),
        cookie: {
         maxAge:1000 * 60 * 604 * 24 * 365 * 10, //10 years
         httpOnly: true,
         sameSite: 'lax', // csrf
         secure: __prod__ //cookie only working in SSL mode

        },
        saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    })
  ) */

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver, BoardResolver, UserResolver],
      validate: false
    }),
    context: ({req, res}): MyContext => ({ em: orm.em, req, res })
  });

  apolloServer.applyMiddleware({app})

  app.listen(4000, () => {
  console.log('server listening on port 4000')
  })


};
// console.log(orm.em); // access EntityManager via `em` property

main().catch(err => {
  console.error(err);
});



