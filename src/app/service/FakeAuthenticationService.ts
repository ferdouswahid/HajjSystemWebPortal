import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Employee} from "../entity/Employee";

@Injectable({providedIn: 'root'})
export class FakeAuthenticationService {

  private currentEmployeeSubject: BehaviorSubject<Employee>;
  public currentEmployee: Observable<Employee>;

  constructor(private http: HttpClient) {
    this.currentEmployeeSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentEmployee')!));
    this.currentEmployee = this.currentEmployeeSubject.asObservable();
  }

  public get currentEmployeeValue(): Employee {
    return this.currentEmployeeSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, {email, password})
      .pipe(map(e => {
        if (e && e.token) {
          localStorage.setItem('currentEmployee', JSON.stringify(e));
          this.currentEmployeeSubject.next(e);
        }
        return e;
      }));
  }

  logout() {
    localStorage.removeItem('currentEmployee');
    this.currentEmployeeSubject.next(null!);
  }
}
