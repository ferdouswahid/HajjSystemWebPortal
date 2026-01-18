import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigInfo } from '../entity/AppConfigInfo';
import { Observable } from 'rxjs';
import { Page } from '../dto/Page';
import { AppConfigInfoSearchDto } from '../dto/AppConfigInfoSearchDto';

@Injectable({ providedIn: 'root' })
export class AppConfigInfoController {
  constructor(private httpClient: HttpClient) { }

  save(appConfigInfo: AppConfigInfo): Observable<AppConfigInfo> {
    return this.httpClient.post<AppConfigInfo>('http://localhost:9999/app-config-info/save', appConfigInfo);
  }

  update(appConfigInfo: AppConfigInfo): Observable<AppConfigInfo> {
    console.log(appConfigInfo);
    return this.httpClient.post<AppConfigInfo>('http://localhost:9999/app-config-info/update', appConfigInfo);
  }

  delete(appConfigInfo: AppConfigInfo): Observable<boolean> {
    return this.httpClient.post<boolean>('http://localhost:9999/app-config-info/delete', appConfigInfo)
  }

  search(appConfigInfoSearchDto: AppConfigInfoSearchDto): Observable<Page<AppConfigInfo>> {
    return this.httpClient.post<Page<AppConfigInfo>>('http://localhost:9999/app-config-info/search', appConfigInfoSearchDto);
  }

}