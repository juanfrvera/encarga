import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { BaseFilter } from 'src/base/data/base-filter';
import { CreateBaseDto } from 'src/base/dto/create-base.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService extends BaseService<Usuario, CreateBaseDto, BaseFilter> {
    constructor(@InjectRepository(Usuario) readonly repo: Repository<Usuario>) {
        super(repo);
    }

    findByMail(mail: string) {
        return this.repo.findOne({ where: { mail: mail } });
    }

    update(id: number, updateDto: Partial<CreateBaseDto>) {
        throw new Error('Method not implemented.');
    }

    fromCreateDto(dto: CreateBaseDto): Usuario {
        throw new Error('Method not implemented.');
    }
}
