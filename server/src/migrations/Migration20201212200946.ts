import { Migration } from '@mikro-orm/migrations';

export class Migration20201212200946 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "koncar"."Department" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('drop table if exists "koncar"."Center" cascade;');
  }

}
