import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remodelation } from './remodelation.entity';
import { CreateRemodelationDto, UpdateRemodelationDto } from './remodelation.dto';

@Injectable()
export class RemodelationService {
  constructor(
    @InjectRepository(Remodelation)
    private readonly repo: Repository<Remodelation>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateRemodelationDto) {
    const remodelation = this.repo.create(dto);
    return this.repo.save(remodelation);
  }

  update(id: number, dto: UpdateRemodelationDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
