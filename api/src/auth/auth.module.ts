import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioComercioModule } from 'src/usuario-comercio/usuario-comercio.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { ComercianteStrategy } from './strategy/comerciante.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UsuarioModule,
    UsuarioComercioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ComercianteStrategy]
})
export class AuthModule { }
