import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { ComercianteWithComercioData } from 'src/comerciante/data/comerciante-with-comercio.data';
import { NoComercioError } from 'src/comerciante/error/no-comercio.error';
import { UsuarioComercioService } from 'src/comerciante/usuario-comercio/usuario-comercio.service';
import { ComercioNotValidError } from 'src/comerciante/error/comercio-not-valid.error';

@Injectable()
export class ComercianteWithComercioStrategy extends PassportStrategy(Strategy, 'comercianteWithComercio') {
    constructor(
        private readonly usuarioComercioService: UsuarioComercioService
    ) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    // Passport will build a user object based on the return value of our validate() method,
    // and attach it as a property on the Request object.
    async validate(req: Request, payload): Promise<ComercianteWithComercioData> {
        const comercioId: string = req.headers['comercio_id'];
        const usuarioId: string = payload.sub;

        if (comercioId) {
            if (await this.usuarioComercioService.isUsuarioFromComercio(usuarioId, comercioId)) {
                return { comercioId, usuarioId };
            }
            else {
                throw new ComercioNotValidError();
            }
        }
        else {
            throw new NoComercioError();
        }
    }
}