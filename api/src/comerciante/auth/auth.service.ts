import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuarioService,
        private jwtService: JwtService
    ) { }

    // TODO:
    // Of course in a real application, you wouldn't store a password in plain text.
    // You'd instead use a library like bcrypt, with a salted one-way hash algorithm.
    // With that approach, you'd only store hashed passwords, and then compare the stored
    // password to a hashed version of the incoming password, thus never storing or exposing
    // user passwords in plain text. To keep our sample app simple, we violate that absolute
    // mandate and use plain text. Don't do this in your real app!
    async validateUser(mail: string, password: string): Promise<any> {
        const user = await this.usuariosService.getByMail(mail);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id };
        return {
            token: this.jwtService.sign(payload),
            expiresIn: jwtConstants.expiresIn,
        };
    }
}
