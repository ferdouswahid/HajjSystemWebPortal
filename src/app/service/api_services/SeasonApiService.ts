import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "../ToastService";
import {Observable, throwError, shareReplay} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SeasonModel} from "../../dto/SeasonModel";

@Injectable()
export class SeasonApiService {
  private readonly END_POINT = `${environment.baseUrl}/Season`;

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  getList(): Observable<Array<SeasonModel>> {
    const url = `${this.END_POINT}`;
    return this.http.get<{data: Array<SeasonModel>}>(`${url}`)
      .pipe(
        map(res => res.data),
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<SeasonModel> {
    const url = `${this.END_POINT}/${id}`;
    return this.http.get<SeasonModel>(url)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  create(dto: SeasonModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.post(url, dto)
      .pipe(
        shareReplay(),
        catchError(err => {
          this.toast.messages$ = err.error.message;
          return throwError(err);
        })
      );
  }

  update(dto: SeasonModel): Observable<any> {
    const url = `${this.END_POINT}`;
    return this.http.put(url, dto)
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
