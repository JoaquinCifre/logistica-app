import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Client } from '../clients/client.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  client: Client;

  @Column()
  date: string;

  @Column()
  shift: string;

  @Column({
    default: 'PENDING',
  })
  status: string;

  @Column({
  nullable: true,
})
estimatedTime: string;
  @Column({
    nullable: true,
  })
  notes: string;
  


@Column({
  default: 'NORMAL',
})
priority: string;
@Column({
  nullable: true,
})
completedAt: Date;
}