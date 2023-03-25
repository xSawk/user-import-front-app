import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImportComponent } from 'src/app/modules/import/import.component';



@NgModule({
  declarations: [
    DefaultComponent,
    UsersComponent,
    ImportComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class DefaultModule { }
