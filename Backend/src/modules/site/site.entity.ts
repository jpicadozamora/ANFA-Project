import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('site')
export class SiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  email: string;

  @Column({ type: 'text', default: '' })
  schedule: string;

  @Column({ type: 'text', default: '' })
  aboutParagraph1: string;

  @Column({ type: 'text', default: '' })
  aboutParagraph2: string;

  @Column({ type: 'text', default: '' })
  aboutParagraph3: string;

  @Column({ type: 'text', default: '' })
  quote: string;

  @Column({ default: '' })
  statYears: string;

  @Column({ default: 'Años de experiencia' })
  statYearsLabel: string;

  @Column({ default: '' })
  statProjects: string;

  @Column({ default: 'Proyectos entregados' })
  statProjectsLabel: string;

  @Column({ default: '' })
  statClients: string;

  @Column({ default: 'Clientes satisfechos' })
  statClientsLabel: string;

  @Column({ default: '' })
  statTeam: string;

  @Column({ default: 'Colaboradores' })
  statTeamLabel: string;
}
