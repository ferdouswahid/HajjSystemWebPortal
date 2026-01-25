import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, throwError, shareReplay } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ContractModel } from "../../dto/ContractModel";
import { ContractUpdateModel } from "../../dto/ContractUpdateModel";
import { ContractSearchModel } from "../../dto/ContractSearchModel";

@Injectable()
export class ContractApiService {
  private readonly END_POINT = `${environment.baseUrl}/Contract`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  getList(): Observable<Array<ContractModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{ data: Array<ContractModel> }>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  search(searchModel: ContractSearchModel): Observable<Array<ContractModel>> {
    const url = `${this.END_POINT}/search`;
    return this.http.post<{ data: Array<ContractModel> }>(url, searchModel)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<ContractModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<ContractModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  create(model: ContractUpdateModel): Observable<any> {
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

  update(model: ContractUpdateModel): Observable<any> {
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

  deleteVehicleContract(id: number): Observable<any> {
    const url = `${environment.baseUrl}/VehicleContract/${id}`;
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
