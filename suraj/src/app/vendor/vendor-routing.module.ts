import { VendorhomeComponent } from './vendorhome/vendorhome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path : 'home', component : VendorhomeComponent},
  {path : 'employee-add', component : EmployeeAddComponent},
  {path : 'employee-list', component : EmployeeListComponent},
  {path : 'customer-list', component : CustomerListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
