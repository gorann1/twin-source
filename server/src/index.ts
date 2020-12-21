import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express()
  app.listen(4000, () => {
    app.get('/', (_, res) => {
      res.send('Zdravo');
    })
    console.log('server listening on port 4000')
  })


};
// console.log(orm.em); // access EntityManager via `em` property

main().catch(err => {
  console.error(err);
});



