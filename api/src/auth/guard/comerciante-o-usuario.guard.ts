import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ComercioOVisitaGuard extends AuthGuard('comerciante') {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        if (req.headers['url-comercio']) {
            // Insertar la url del comercio en el objeto de datos de usuario
            req.user = { urlComercio: req.headers['url-comercio'] };
            return true;
        }

        // Si no tiene una urlComercio indicada en las headers, fijarse si tiene token de comerciante
        return super.canActivate(context);
    }
}
