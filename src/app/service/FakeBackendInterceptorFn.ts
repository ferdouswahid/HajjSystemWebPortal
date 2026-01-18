import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import { inject } from '@angular/core';
import {delay, dematerialize, materialize, mergeMap, of, throwError} from "rxjs";
import { JwtDecodeService } from './JwtDecodeService';
import { LocalStorageService } from './LocalStorageService';

let userList: Array<any> = [];

export const fakeHttpInterceptorFn: HttpInterceptorFn = (
  request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  //console.log(request); console.log(request.headers.get('req_type'));
  const jwtDecodeService = inject(JwtDecodeService);
  const localStorageService = inject(LocalStorageService);
  let cloneRequest:HttpRequest<any>;
  if (request.headers.get('req_type') === 'no_auth') {
    cloneRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  else if (request.headers.get('req_type') === 'file_upload') {
    const adminJwtToken = localStorageService.getItem("hajj_system_jwt")
    //const adminJwtTokenDecoded = jwtDecodeService.decode('')
    cloneRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${ adminJwtToken }`,
      }
    });
  } else {
    const adminJwtToken = localStorageService.getItem("hajj_system_jwt")
    cloneRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ adminJwtToken }`,
      }
    });
  }
  // if (request.params.get('param_type') == 'no_auth') {
  //   console.log('No auth type so skiping Authorization Bearer add in header');
  // } else {
  //   const adminJwtToken = 'JwtTokenService.getAdminToken()'
  //   if (adminJwtToken) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${adminJwtToken}`,
  //       },
  //     });
  //   }
  // }


  return of(null).pipe(mergeMap(() => {

    /*if (request.url.endsWith('/Auth/login') && request.method === 'POST') {
      console.log('Intercepted login request:', request.body)
      if ((request.body as any).username === 'user1' && (request.body as any).password === 'password1') {
        return of(new HttpResponse({
          status: 200,
          body: {
            status: true,
            message: 'Login successful',
            data: { accessToken: 'fake-jwt-token' }
          }
        }));
      } else {
        return throwError({ error: { message: 'Username or password is incorrect' } });
      }
    }
    else*/ if (request.url.endsWith('/users') && request.method === 'GET') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        return of(new HttpResponse({status: 200, body: userList}));
      } else {
        return throwError({status: 401, error: {message: 'Unauthorised'}});
      }
    }
    else if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const matchedUsers = userList.filter(user => user.id === id);
        const user = matchedUsers.length ? matchedUsers[0] : null;
        return of(new HttpResponse({status: 200, body: user}));
      } else {
        return throwError({status: 401, error: {message: 'Unauthorised'}});
      }
    }
    else if (request.url.endsWith('/users/register') && request.method === 'POST') {
      console.log(request.body);
      localStorage.setItem('users', JSON.stringify([]));
      return of(new HttpResponse({status: 200}));
    }
    else if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        return of(new HttpResponse({status: 200, body: []}));
      } else {
        return throwError({status: 401, error: {message: 'Unauthorised'}});
      }
    }
    else {
      return next(cloneRequest);
    }
  }))
    .pipe(materialize())
    .pipe(delay(1000))
    .pipe(dematerialize());

}
