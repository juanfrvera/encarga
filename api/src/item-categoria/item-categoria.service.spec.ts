import { Test, TestingModule } from '@nestjs/testing';
import { ItemCategoriaService } from './item-categoria.service';

describe('ItemCategoriaService', () => {
  let service: ItemCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCategoriaService],
    }).compile();

    service = module.get<ItemCategoriaService>(ItemCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
