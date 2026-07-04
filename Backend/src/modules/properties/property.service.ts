import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto, UpdatePropertyDto } from './property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private repo: Repository<Property>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Propiedad no encontrada');
    return p;
  }

  create(dto: CreatePropertyDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdatePropertyDto) {
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