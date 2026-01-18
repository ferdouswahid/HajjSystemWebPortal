import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "../ToastService";
import {Observable, shareReplay, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {LoginInfoDto} from "../../dto/LoginInfoDto";

@Injectable()
export class AuthApiService {
  private readonly END_POINT = `${environment.baseUrl}/Auth`;


  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  login(dto: LoginInfoDto): Observable<any> {
    const url = `${this.END_POINT}/login`;
    return this.http.post(`${url}`, dto)
      .pipe(shareReplay(), catchError(err => {
        this.toast.messages$ = err.error.message;
        return throwError(err);
      }));
  }

}
