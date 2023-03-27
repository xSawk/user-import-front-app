import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImportComponent } from 'src/app/modules/import/import.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DefaultComponent,
    UsersComponent,
    ImportComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class DefaultModule { }
