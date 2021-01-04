import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { BoardResolver } from './resolvers/board';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import  cors  from 'cors';


const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true,
  })),
  // Session run before Apollo Middleware
  app.use(
    session({
      name: 'quake',
      store: new RedisStore({ 
        client: redisClient,
        disableTouch: true,
       }),
       cookie:{
        maxAge: 100 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: __prod__ // cookie only works with https
       },
      secret: 'inspiron cat',
      resave: false,
      saveUninitialized: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver, BoardResolver, UserResolver],
      validate: false
    }),
    context: ({req, res}) =>({ em: orm.em, req, res}),
  });

  apolloServer.applyMiddleware({
    app, 
    //cors: {origin: 'http://localhost:3000'},
    cors: false
  })

  app.listen(4000, () => {
  console.log('server listening on port 4000')
  })


};
// console.log(orm.em); // access EntityManager via `em` property

main().catch(err => {
  console.error(err);
});



