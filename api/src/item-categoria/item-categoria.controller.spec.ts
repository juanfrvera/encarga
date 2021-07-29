import { Test, TestingModule } from '@nestjs/testing';
import { ItemCategoriaController } from './item-categoria.controller';
import { ItemCategoriaService } from './item-categoria.service';

describe('ItemCategoriaController', () => {
  let controller: ItemCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCategoriaController],
      providers: [ItemCategoriaService],
    }).compile();

    controller = module.get<ItemCategoriaController>(ItemCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
