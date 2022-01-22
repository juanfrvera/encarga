import { Controller } from '@nestjs/common';
import { ItemCategoriaService } from './item-categoria.service';

@Controller('item-categoria')
export class ItemCategoriaController {
  constructor(private readonly itemCategoriaService: ItemCategoriaService) {}
}
