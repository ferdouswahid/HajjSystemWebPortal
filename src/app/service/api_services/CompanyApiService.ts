import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, shareReplay, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CompanyModel } from "../../dto/CompanyModel";

@Injectable()
export class CompanyApiService {
  private readonly END_POINT = `${environment.baseUrl}/Company`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  getList(): Observable<Array<CompanyModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{ data: Array<CompanyModel> }>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<CompanyModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<CompanyModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  create(model: CompanyModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.post(url, model)
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  update(model: CompanyModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.put(url, model)
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.delete(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }
}
