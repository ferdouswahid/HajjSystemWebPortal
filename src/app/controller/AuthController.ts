import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginInfoDto} from "../dto/LoginInfoDto";
import { AccessTokenDto } from "../dto/AccessTokenDto";

@Injectable({ providedIn: 'root' })
export class AuthController {

  constructor(private httpClient: HttpClient) { }

  customerLogin(loginInfoDto: LoginInfoDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>( 'http://localhost:9999/login/customer-login', loginInfoDto);
  }

  adminLogin(loginInfoDto: LoginInfoDto): Observable<AccessTokenDto> {
    const headers = new HttpHeaders().append('req_type', 'no_auth');
    return this.httpClient.post<AccessTokenDto>( 'http://localhost:9999/login/admin-login?param_type=no_auth', 
      loginInfoDto, {headers: headers} );
  }

}
