import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { User } from './model/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements AfterViewInit{
  
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
    ).subscribe(data => this.dataSource = data);
  }

  
 
}
