import { Department } from './entities/Department';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
//  const center = orm.em.create(Center, { name: 'testni centar' });
//  await orm.em.persistAndFlush(center)
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



