import { Injectable } from '@nestjs/common';
import { BaseFilterDto } from 'src/base/dto/base-filter.dto';
import { EntityManager, Repository } from 'typeorm';
import { BaseFilter } from './data/base.filter';
import { CreateBaseDto } from './dto/create-base.dto';
import { Base } from './entities/base.entity';

@Injectable()
export abstract class BaseService<Entity extends Base, CreateDto extends CreateBaseDto, Filter extends BaseFilter> {

  constructor(protected readonly repo: Repository<Entity>) { }

  abstract count(filter?: Filter);

  create(createDto: CreateDto, manager?: EntityManager) {
    const entity = this.fromCreateDto(createDto);

    if (manager) {
      return manager.save(entity);
    }
    else {
      return this.repo.save(entity as any) as Promise<Entity>;
    }
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

  /**
   * 
   * @param id id de entidad a cargar
   * @param relations relaciones a cargar
   * @param manager usado en transacciones
   * @returns 
   */
  findOneOrFail(id: number, relations?: string[], manager?: EntityManager) {
    if (manager) {
      return manager.findOneOrFail<Entity>(this.repo.target, id, { relations });
    }
    else {
      return this.repo.findOneOrFail(id, { relations });
    }
  }

  abstract update(id: number, updateDto: Partial<CreateDto>);

  /**
   * 
   * @param id 
   * @param manager used in transactions
   * @returns 
   */
  async remove(id: number, manager?: EntityManager) {
    if (manager) {
      const entity = await manager.findOne<Entity>(this.repo.target, id);
      await manager.remove(entity);
      return entity;
    }
    else {
      const entity = await this.repo.findOne(id);
      await this.repo.remove(entity);
      return entity;
    }
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

  abstract fromCreateDto(dto: CreateDto): Entity;
}
