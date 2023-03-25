import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ImportComponent } from './modules/import/import.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'import', component: ImportComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
