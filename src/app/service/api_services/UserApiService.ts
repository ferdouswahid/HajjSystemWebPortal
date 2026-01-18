import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, shareReplay, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomerUserCreationModel } from "../../dto/CustomerUserCreationModel";
import { CompanyUserCreationModel } from "../../dto/CompanyUserCreationModel";

@Injectable()
export class UserApiService {
  private readonly END_POINT = `${environment.baseUrl}/User`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  customerUserCreation(dto: CustomerUserCreationModel): Observable<any> {
    const url = `${this.END_POINT}/customer`;
    return this.http.post(url, dto)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  companyUserCreation(dto: CompanyUserCreationModel): Observable<any> {
    const url = `${this.END_POINT}/company`;
    return this.http.post(url, dto)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }
}
