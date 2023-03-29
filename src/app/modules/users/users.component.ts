import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, merge, startWith, switchMap } from 'rxjs';
import { User } from './model/user';
import { UsersService } from './users.service';
import {Md5} from 'ts-md5';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements AfterViewInit{
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["id","name","surname","login"];
  totalElements: number = 0;
  dataSource: User[] = [];
  searchValue: string = '';

  constructor(private usersService: UsersService){}
 
 
  ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap((event: any) => {
          if (event.active) {
            this.paginator.pageIndex = 0;
          }
  
          return this.usersService.getUsers(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.searchValue,
            this.sort.active,
            this.sort.direction
          );
        }),
        map(data => {
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe(data => {
        this.dataSource = data;
        this.dataSource.forEach(user => {
          const hash = Md5.hashStr(user.name);
          user.surname = `${user.surname}_${hash}`;
        });
      });
  }

applyFilter(): void {
  this.paginator.pageIndex = 0;
  this.ngAfterViewInit();
}
}
