import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withXsrfConfiguration} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch(),

  //   withXsrfConfiguration({
  //   cookieName: 'CUSTOM_XSRF_TOKEN',
  //   headerName: 'X-Custom-Xsrf-Header',
  // })

  )]
};

