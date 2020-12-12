import { Center } from './entities/Center';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import microConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
//  const center = orm.em.create(Center, { name: 'testni centar' });
//  await orm.em.persistAndFlush(center)
  const centers = await orm.em.find(Center, {});
  console.log(centers);
};
// console.log(orm.em); // access EntityManager via `em` property

main().catch(err => {
  console.error(err);
});



