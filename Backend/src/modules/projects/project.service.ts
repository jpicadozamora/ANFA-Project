import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private repo: Repository<Project>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Proyecto no encontrado');
    return p;
  }

  create(dto: CreateProjectDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateProjectDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { deleted: true };
  }
}