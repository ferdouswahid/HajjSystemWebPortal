import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routeList } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {fakeHttpInterceptorFn} from "./service/FakeBackendInterceptorFn";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeList),
    provideAnimationsAsync('noop'),
    provideHttpClient(withInterceptors([fakeHttpInterceptorFn]))
  ]
};
