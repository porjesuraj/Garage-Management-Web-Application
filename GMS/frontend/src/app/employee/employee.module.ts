import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddComponent } from './stock-add/stock-add.component';
import { EmployeeFeedbackComponent } from './employee-feedback/employee-feedback.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeehomeComponent } from './employeehome/employeehome.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [EmployeehomeComponent, CustomerAddComponent, CustomerListComponent, AddServiceComponent, InvoiceComponent, PrintInvoiceComponent, ProfileComponent, EmployeeFeedbackComponent, StockAddComponent,StockListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class EmployeeModule { }
