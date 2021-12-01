import { Controller } from '@nestjs/common';
import { ComercioService } from './comercio.service';

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComercioService) {}
}
