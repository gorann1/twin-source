import { Migration } from '@mikro-orm/migrations';

export class Migration20201212105511 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "koncar"."Center" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
