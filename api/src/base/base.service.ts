import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity';

@Injectable()
export class BaseService<Entity extends Base, CreateDto extends CreateBaseDto, UpdateDto extends UpdateBaseDto> {

  constructor(protected readonly repo: Repository<Entity>) { }

  create(createDto: CreateDto) {
    return this.repo.save(createDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, updateDto: UpdateDto) {
    const original = await this.repo.findOne(id);

    const updated = {
      ...original,
      ...updateDto
    };

    await this.repo.save(updated);

    return updated;
  }

  remove(id: number) {
    const entity = this.repo.findOne(id);
    this.repo.delete(id);

    return entity;
  }

  findAllWithFilter(filter: { listaIds: number[] }) {
    return this.repo.findByIds(filter.listaIds);
  }
}
