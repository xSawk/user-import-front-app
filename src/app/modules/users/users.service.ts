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


  getUsers(page: number, size: number, searchValue: string, sort?: string, direction?: string): Observable<Page<User>> {
    let queryParams = `page=${page}&size=${size}`;
    if (searchValue) {
      queryParams += `&searchValue=${searchValue}`;
    }
    if (sort && direction) {
      queryParams += `&sort=${sort},${direction}`;
    }
    return this.http.get<Page<User>>(`http://localhost:8080/api/v1/users?${queryParams}`);
  }
}
