import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Remodelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  beforeImageUrl: string;

  @Column({ nullable: true })
  afterImageUrl: string;

  @Column({ nullable: true })
  category: string;
}
