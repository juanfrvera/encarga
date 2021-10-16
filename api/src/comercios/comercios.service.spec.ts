import { Test, TestingModule } from '@nestjs/testing';
import { ComerciosService } from './comercios.service';

describe('ComerciosService', () => {
  let service: ComerciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComerciosService],
    }).compile();

    service = module.get<ComerciosService>(ComerciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
