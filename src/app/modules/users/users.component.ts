import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit{
  

  dataSource: User[] = [];
  displayedColumns: string[] = ["id","name","surname","login"];

  constructor(private usersService: UsersService){}
 
 
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers(0,25)
    .subscribe(page => this.dataSource = page.content)
  }

}
