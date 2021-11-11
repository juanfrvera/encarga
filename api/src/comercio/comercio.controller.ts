import { Controller } from '@nestjs/common';
import { ComerciosService } from './comercio.service';

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComerciosService) {}
}
