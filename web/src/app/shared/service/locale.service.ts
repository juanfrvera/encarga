import { Injectable } from '@angular/core';
import * as esLocale from '../../../assets/locales/es.json';

@Injectable()
export class LocaleService {
  private locale = esLocale;

  constructor() { }

  public getUserFriendlyError(error): string {
    if (error.messageId && this.locale[error.messageId]) {
      return this.locale[error.messageId];
    }
    return 'Error inesperado, vuelve a intentar más tarde';
  }
}
