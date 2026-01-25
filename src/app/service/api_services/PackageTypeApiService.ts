import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, throwError, shareReplay } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PackageTypeModel } from "../../dto/PackageTypeModel";
import { PackageTypeUpdateModel } from "../../dto/PackageTypeUpdateModel";
import { PackageTypeSearchModel } from "../../dto/PackageTypeSearchModel";

@Injectable()
export class PackageTypeApiService {
  private readonly END_POINT = `${environment.baseUrl}/PackageType`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  getList(): Observable<Array<PackageTypeModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{ data: Array<PackageTypeModel> }>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  search(searchModel: PackageTypeSearchModel): Observable<Array<PackageTypeModel>> {
    const url = `${this.END_POINT}/search`;
    return this.http.post<{ data: Array<PackageTypeModel> }>(url, searchModel)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<PackageTypeModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<PackageTypeModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  create(model: PackageTypeUpdateModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.post(url, model)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  update(model: PackageTypeUpdateModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.put(url, model)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
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
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }
}
