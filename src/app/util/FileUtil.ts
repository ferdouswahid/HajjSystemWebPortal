import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {filter, map, tap} from "rxjs/operators";
import {pipe} from "rxjs";

export function toResponseBody<T>(): any {
  return pipe(
    // @ts-ignore
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>( fn: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress && event.total && event.loaded) {
      fn(Math.round((100 * event.loaded) / event.total));
    }
  });
}
