import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { OperationType } from '../types';

@Entity('operations')
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['*', 'create', 'read', 'update', 'delete'],
    default: '*'
  })
  type: OperationType;

  @Column('varchar')
  resource: string;
}
