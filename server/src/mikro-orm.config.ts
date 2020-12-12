import { Center } from './entities/Center';
import { __prod__ } from "./constants";
import { MikroORM } from '@mikro-orm/core'
import path from 'path'

// Check absolute path
// console.log('dirname: ', __dirname),
export default {
  tableName: 'centers', 
  entities: [Center],  
  migrations:{
    path: path.join (__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  dbName: 'creahuman',
  schemaName: 'koncar',
  type: 'postgresql', 
  user: 'postgres',
  password: 'postgres575',
  debug: !__prod__,
  // TODO: check it if I need it here

  //ClientUrl:'
  
} as Parameters<typeof MikroORM.init>[0];