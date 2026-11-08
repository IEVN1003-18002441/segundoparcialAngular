import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Importamos las herramientas de idioma de Angular
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

// 2. Registramos el idioma español
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 3. Forzamos a que toda la app use español
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};