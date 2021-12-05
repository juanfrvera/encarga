import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { ComercianteData } from 'src/comerciante/data/comerciante.data';

@Injectable()
export class ComercianteStrategy extends PassportStrategy(Strategy, 'comerciante') {
    constructor() {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    // Passport will build a user object based on the return value of our validate() method,
    // and attach it as a property on the Request object.
    async validate(payload): Promise<ComercianteData> {
        const usuarioId: string = payload.sub;

        return { usuarioId };
    }
}