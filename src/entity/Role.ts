import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToMany(type => User, user => user.roles)
  @JoinTable()
  users: User[];
}
