import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsers(page: number, size: number): Observable<Page<User>>{
      return this.http.get<Page<User>>(`http://localhost:8080/users?page=${page}&size=${size}`);
  }
}
