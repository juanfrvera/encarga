import { Test, TestingModule } from '@nestjs/testing';
import { ComerciosController } from './comercios.controller';
import { ComerciosService } from './comercios.service';

describe('ComerciosController', () => {
  let controller: ComerciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComerciosController],
      providers: [ComerciosService],
    }).compile();

    controller = module.get<ComerciosController>(ComerciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
