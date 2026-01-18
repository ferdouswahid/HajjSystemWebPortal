import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';


export function formatErrors(httpErrorResponse: HttpErrorResponse) {
  /*console.log({httpErrorResponse})
  if(httpErrorResponse.status === 404){
    console.log("Network issue")
    //this.toastrService.error("Network issue","Message")
  }
  if(httpErrorResponse.status === 503){
    console.log("Network issue")
    //this.toastrService.error("Network issue","Message")
  }
  //console.log(error);
  return throwError(httpErrorResponse.error);*/
  return throwError(httpErrorResponse);
}
