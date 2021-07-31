import { Injectable } from '@nestjs/common';
import { BaseFilter } from 'src/base/data/base-filter';
import { EntityManager, Repository } from 'typeorm';
import { CreateBaseDto } from './dto/create-base.dto';
import { Base } from './entities/base.entity';

@Injectable()
export abstract class BaseService<Entity extends Base, CreateDto extends CreateBaseDto, Filter extends BaseFilter> {

  constructor(protected readonly repo: Repository<Entity>) { }

  create(createDto: CreateDto) {
    return this.repo.save(createDto);
  }

  findAll() {
    return this.repo.find();
  }

  /**
   * 
   * @param id id de entidad a cargar
   * @param relations relaciones a cargar
   * @param manager usado en transacciones
   * @returns 
   */
  findOne(id: number, relations?: string[], manager?: EntityManager) {
    if (manager) {
      return manager.findOne<Entity>(this.repo.target, id, { relations });
    }
    else {
      return this.repo.findOne(id, { relations });
    }
  }

  abstract update(id: number, updateDto: Partial<CreateDto>);

  remove(id: number) {
    const entity = this.repo.findOne(id);
    this.repo.delete(id);

    return entity;
  }

  /**
   * 
   * @param filter 
   * @param manager usado en transacciones 
   * @returns 
   */
  findAllWithFilter(filter: Filter, manager?: EntityManager) {
    if (manager) {
      return manager.findByIds<Entity>(this.repo.target, filter.ids);
    }
    else {
      return this.repo.findByIds(filter.ids);
    }
  }
}
