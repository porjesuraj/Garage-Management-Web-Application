import { EmployeehomeComponent } from './employeehome/employeehome.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from '../vendor/customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';


const routes: Routes = [
  {path : 'home', component : EmployeehomeComponent},
  {path : 'customer-add', component : CustomerAddComponent},
  {path : 'customer-list', component : CustomerListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
