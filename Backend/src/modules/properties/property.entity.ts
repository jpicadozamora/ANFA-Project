import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column()
  price: string;

  @Column({ type: 'int', default: 0 })
  bedrooms: number;

  @Column({ type: 'int', default: 0 })
  bathrooms: number;

  @Column({ type: 'decimal', nullable: true })
  houseSquareMeters: number;

  @Column({ type: 'decimal', nullable: true })
  lotSquareMeters: number;

  @Column({ type: 'boolean', default: false })
  garage: boolean;

  @CreateDateColumn()
  createdAt: Date;
}