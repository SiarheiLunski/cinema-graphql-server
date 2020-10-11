import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './Role';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column('varchar', { length: 255 }) 
    email: string;
   
    @Column('text') 
    password: string;

    @Column('boolean', { default: false })
    confirmed: boolean;

    @ManyToMany(type => Role, role => role.users)
    @JoinTable({
      name: 'users_roles',
      joinColumns: [
        { name: 'user_id' }
      ],
      inverseJoinColumns: [
        { name: 'role_id' }
      ]
    })
    roles: Role[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 10);
    }
}
