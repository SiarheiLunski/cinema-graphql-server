import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../entity/Role';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { id: 1, name: 'admin' },
        { id: 1, name: 'customer' },
      ])
      .onConflict('("id") DO NOTHING')
      .execute();
  }
}
