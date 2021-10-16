import { Controller } from '@nestjs/common';
import { ComerciosService } from './comercios.service';

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComerciosService) {}
}
