import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Operation } from './Operation';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @ManyToMany(type => Operation)
  @JoinTable({
    name: 'roles_operations',
    joinColumns: [
      { name: 'role_id' }
    ],
    inverseJoinColumns: [
      { name: 'operation_id' }
    ]
  })
  operations: Operation[]
}
