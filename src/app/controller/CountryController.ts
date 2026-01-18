import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Country } from "../entity/Country";
import { CountrySearchDto } from "../dto/CountrySearchDto";
import { Page } from "../dto/Page";
import { ApiResponse } from "../util/ApiResponse";

@Injectable({ providedIn: 'root' })
export class CountryController {

  constructor(private httpClient: HttpClient) { }

  save(country: Country): Observable<ApiResponse<Country>> {
    return this.httpClient.post<ApiResponse<Country>>('http://localhost:9999/country/save', country);
  }

  update(country: Country): Observable<Country> {
    return this.httpClient.post<Country>('http://localhost:9999/country/update', country);
  }

  delete(country: Country): Observable<boolean> {
    return this.httpClient.post<boolean>('http://localhost:9999/country/delete', country)
  }

  search(countrySearchDto: CountrySearchDto): Observable<ApiResponse<Page<Country>>> {
    return this.httpClient.post<ApiResponse<Page<Country>>>('http://localhost:9999/country/search', countrySearchDto);
  }

  searchByName(countrySearchDto: CountrySearchDto): Observable<ApiResponse<Page<Country>>> {
    return this.httpClient.post<ApiResponse<Page<Country>>>('http://localhost:9999/country/search-by-name',
      countrySearchDto);
  }

}