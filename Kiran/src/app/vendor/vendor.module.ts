import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { VendorhomeComponent } from './vendorhome/vendorhome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VendorFeedbackComponent } from './vendor-feedback/vendor-feedback.component';


@NgModule({
  declarations: [CustomerListComponent, EmployeeListComponent, EmployeeAddComponent, VendorhomeComponent, VendorFeedbackComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class VendorModule { }
