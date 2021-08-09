import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioComercioService } from './usuario-comercio.service';

describe('UsuarioComercioService', () => {
  let service: UsuarioComercioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioComercioService],
    }).compile();

    service = module.get<UsuarioComercioService>(UsuarioComercioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
