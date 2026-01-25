import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "../ToastService";
import { Observable, throwError, shareReplay } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { VehicleModel } from "../../dto/VehicleModel";
import {VehicleUpdateModel} from "../../dto/VehicleUpdateModel";
import {ContractSearchModel} from "../../dto/ContractSearchModel";
import {ContractModel} from "../../dto/ContractModel";
import {VehicleDetailSearchModel} from "../../dto/VehicleDetailSearchModel";
import {VehicleDetailModel} from "../../dto/VehicleDetailModel";

@Injectable()
export class VehicleApiService {
  private readonly END_POINT = `${environment.baseUrl}/Vehicle`;

  constructor(private http: HttpClient,
    private toast: ToastrService) {
  }

  getList(): Observable<Array<VehicleModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{ data: Array<VehicleModel> }>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<VehicleModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<VehicleModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  create(model: VehicleUpdateModel): Observable<any> {
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

  update(model: VehicleUpdateModel): Observable<any> {
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


  deleteVehicleDetail(id: number): Observable<any> {
    const url = `${environment.baseUrl}/VehicleDetail/${id}`;
    return this.http.delete(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  search(searchModel: VehicleDetailSearchModel): Observable<Array<VehicleDetailModel>> {
    const url = `${environment.baseUrl}/VehicleDetail/search`;
    return this.http.post<{ data: Array<VehicleDetailModel> }>(url, searchModel)
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
