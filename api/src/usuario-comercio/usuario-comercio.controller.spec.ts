import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioComercioController } from './usuario-comercio.controller';
import { UsuarioComercioService } from './usuario-comercio.service';

describe('UsuarioComercioController', () => {
  let controller: UsuarioComercioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioComercioController],
      providers: [UsuarioComercioService],
    }).compile();

    controller = module.get<UsuarioComercioController>(UsuarioComercioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
