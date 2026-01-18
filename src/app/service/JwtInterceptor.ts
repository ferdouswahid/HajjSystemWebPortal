import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './AuthenticationService';
import { FakeAuthenticationService } from './FakeAuthenticationService';


// @Injectable({ providedIn: 'root' })
// export class JwtInterceptor implements HttpInterceptor {

//   constructor(private authenticationService: AuthenticationService,
//     private fakeAuthenticationService: FakeAuthenticationService) {
//   }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const jwtToken = 'jwtToken123';
    
//     if (request.params.get('param_type') == 'no_auth') {

//     }
//     else if (request.params.get('param_type') == 'no_auth') {
//       console.log('No auth type so skiping Authorization Bearer add in header');
//     } else {
//       const currentEmployee = this.fakeAuthenticationService.currentEmployeeValue;
//       if (currentEmployee) {
//         request = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//       }
//     }
//     return next.handle(request);
//   }
// }
