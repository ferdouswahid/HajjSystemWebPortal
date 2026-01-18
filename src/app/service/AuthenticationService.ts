import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  currentUserValue: any;

  constructor() {
  }

  login(email: string, password: string) {
    return true;
  }

  logout() {
    return true;
  }


}

