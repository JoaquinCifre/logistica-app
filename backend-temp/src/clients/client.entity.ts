import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  schedule: string;

  @Column({ nullable: true })
  notes: string;

  @Column({
  default: "CLIENT",
})
type: string;

@Column({
  type: 'float',
  nullable: true,
})
latitude: number;

@Column({
  type: 'float',
  nullable: true,
})
longitude: number;

@Column({ nullable: true })
contactName: string;

@Column({ nullable: true })
deliveryInstructions: string;

@Column({ nullable: true })
openingHours: string;
@Column({
  default: true,
})
active: boolean;
}