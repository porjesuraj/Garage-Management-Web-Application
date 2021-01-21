import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './customer-list/customer-list.component';


@NgModule({
  declarations: [HomeComponent, EmployeeListComponent, EmployeeAddComponent, CustomerListComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class VendorModule { }
