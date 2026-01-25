import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, throwError, shareReplay } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PackageModel } from "../../dto/PackageModel";
import { PackageUpdateModel } from "../../dto/PackageUpdateModel";
import { PackageSearchModel } from "../../dto/PackageSearchModel";

@Injectable()
export class PackageApiService {
  private readonly END_POINT = `${environment.baseUrl}/Package`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  getList(): Observable<Array<PackageModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{ data: Array<PackageModel> }>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  search(searchModel: PackageSearchModel): Observable<Array<PackageModel>> {
    const url = `${this.END_POINT}/search`;
    return this.http.post<{ data: Array<PackageModel> }>(url, searchModel)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<PackageModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<PackageModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  create(model: PackageUpdateModel): Observable<any> {
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

  update(model: PackageUpdateModel): Observable<any> {
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

  deletePackageVehicle(id: number): Observable<any> {
    const url = `${environment.baseUrl}/PackageVehicle/${id}`;
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
