import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, shareReplay, throwError } from "rxjs";
import {catchError, map} from "rxjs/operators";
import { CustomerUserCreationModel } from "../../dto/CustomerUserCreationModel";
import { CompanyUserCreationModel } from "../../dto/CompanyUserCreationModel";
import {PackageTypeSearchModel} from "../../dto/PackageTypeSearchModel";
import {PackageTypeModel} from "../../dto/PackageTypeModel";
import {UserSearchModel} from "../../dto/UserSearchModel";
import {UserModel} from "../../dto/UserModel";

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

  search(searchModel: UserSearchModel): Observable<Array<UserModel>> {
    const url = `${this.END_POINT}/search`;
    return this.http.post<{ data: Array<UserModel> }>(url, searchModel)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

}
