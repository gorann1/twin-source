import { Department } from './entities/Department';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { BoardResolver } from './resolvers/board';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
<<<<<<< HEAD
//  const center = orm.em.create(Center, { name: 'testni centar' });
//  await orm.em.persistAndFlush(center)
  const app = express()
  app.listen(4000, () => {
    app.get('/', (_, res) => {
      res.send('Zdravo');
=======
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver, BoardResolver],
      validate: false
<<<<<<< HEAD
>>>>>>> dev
    })
=======
    }),
    context: () =>({ em: orm.em })
>>>>>>> dev
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



