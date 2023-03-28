import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs';
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
  

  constructor(private usersService: UsersService){}
 
 
  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.usersService.getUsers(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
          this.totalElements = data.totalElements;
          return data.content;
      })
    ).subscribe(data => {     
      this.dataSource = data;
      this.dataSource.forEach(user => {
        const hash = Md5.hashStr(user.name)
        user.surname = `${user.surname}_${hash}`;
      });
    });
  }

 

  sortData(sort: Sort): void {
    const data = this.dataSource.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }
    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'login': return compare(a.login, b.login, isAsc);
        default: return 0;
      }
    });

    function compare(a: string | number, b: string | number, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

}
}
