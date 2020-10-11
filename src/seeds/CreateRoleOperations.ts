import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateRoleOperations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('roles_operations')
      .values([
        { role_id: 1, operation_id: 1 },
        { role_id: 2, operation_id: 3 }
      ])
      .execute();
  }
}
