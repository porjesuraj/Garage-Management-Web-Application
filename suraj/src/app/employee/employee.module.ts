import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeehomeComponent } from './employeehome/employeehome.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { StockAddComponent } from './stock-add/stock-add.component';
import { StockListComponent } from './stock-list/stock-list.component';



@NgModule({
  declarations: [EmployeehomeComponent, CustomerAddComponent, CustomerListComponent, StockAddComponent, StockListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
