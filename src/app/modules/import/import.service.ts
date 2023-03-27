import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadResponse } from './model/uploadResponse';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

 
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>('http://localhost:8080/load', formData);
  }
}
