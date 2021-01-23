import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddComponent } from './stock-add/stock-add.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeehomeComponent } from './employeehome/employeehome.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAddComponent } from './customer-add/customer-add.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EmployeeFeedbackComponent } from './employee-feedback/employee-feedback.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path : 'home', component : EmployeehomeComponent},
  {path : 'customer-add', component : CustomerAddComponent},
  {path : 'customer-list', component : CustomerListComponent},
  {path : 'add-service', component : AddServiceComponent},
  {path : 'invoice', component : InvoiceComponent},
  {path : 'print-invoice', component : PrintInvoiceComponent},
  {path : 'feedback', component : EmployeeFeedbackComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'stock-add', component : StockAddComponent},
  {path : 'stock-list', component : StockListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
