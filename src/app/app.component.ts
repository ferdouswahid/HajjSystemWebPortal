import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from 'rxjs/operators';
import {toResponseBody, uploadProgress} from "./util/FileUtil";
import {formatErrors} from "./util/ErrorUtil";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  fileUploadProgress = 0;
  selectedProfileImage: File | null = null;

  constructor(private http: HttpClient) {
  }

  onChooseProfileImage(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    const file: File = event.target.files[0];
    const extension: string = file.name.split('.').pop() ?? '';
    const size = event.target.files[0].size;
    if (size > 250 * 1024) {
      console.log("Image can not be more then 250Kb", `Message`);
      return;
    }
    if (extension === 'jpg' || extension === 'jpeg'
      || extension === 'png' || extension === 'webp') {
      this.selectedProfileImage = file;
      this.uploadProfileImage();
    } else {
      console.log("Not valid file type.Only JPG, PNG, WEBP are acceptable", `Message`);
      return;
    }
  }

  uploadProfileImage() {
    this.uploadProfileImage2(this.selectedProfileImage)
      .pipe(
        uploadProgress(progress => (this.fileUploadProgress = progress)),
        toResponseBody()
      )
      .subscribe((res: any) => {
        if (res['httpStatusCode'] === 201) {
          console.log("")
        } else {
          console.log("")
        }
      }, (error) => {
        console.log("")
      });
  }


  uploadProfileImage2(file: File | null): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file);
      formData.append('additionalInfo', file);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    let options = {headers: headers};
    return this.http.post<any>(`http://localhost:9999/file-upload/room-image-upload`, formData, options);

    /*const req = new HttpRequest('POST', `http://localhost:9999/file-upload/room-image-upload`,
      formData, {headers, reportProgress: true, responseType: 'json'});
    return this.http.request(req).pipe(catchError(formatErrors))*/

  }


}