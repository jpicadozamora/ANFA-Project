import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', nullable: true })
  squareMeters: number;

  @Column({ type: 'int', nullable: true })
  rooms: number;

  @Column({ type: 'int', nullable: true })
  bathrooms: number;

  @Column({ type: 'boolean', default: false })
  garage: boolean;

  @CreateDateColumn()
  createdAt: Date;
}