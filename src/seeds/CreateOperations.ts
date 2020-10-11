import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Operation } from '../entity/Operation';

const ALL = '*';
const CREATE = 'create';
const READ = 'read';
const UPDATE = 'update';
const DELETE = 'delete';

export default class CreateOperation implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Operation)
      .values([
        { id: 1, type: ALL, resource: 'users' },
        { id: 2, type: CREATE, resource: 'users' },
        { id: 3, type: READ, resource: 'users' },
        { id: 4, type: UPDATE, resource: 'users' },
        { id: 5, type: DELETE, resource: 'users' },
      ])
      .onConflict('("id") DO NOTHING')
      .execute();
  }
}
