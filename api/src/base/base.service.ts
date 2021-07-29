import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity';

@Injectable()
export abstract class BaseService<Entity extends Base, CreateDto extends CreateBaseDto, UpdateDto extends UpdateBaseDto> {

  constructor(protected readonly repo: Repository<Entity>) { }

  create(createDto: CreateDto) {
    return this.repo.save(createDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number, relations?: string[]) {
    return this.repo.findOne(id, {relations});
  }

  abstract update(id: number, updateDto: UpdateDto);

  remove(id: number) {
    const entity = this.repo.findOne(id);
    this.repo.delete(id);

    return entity;
  }

  findAllWithFilter(filter: { listaIds: number[] }) {
    return this.repo.findByIds(filter.listaIds);
  }
}
