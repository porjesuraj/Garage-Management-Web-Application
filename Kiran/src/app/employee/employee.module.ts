import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeehomeComponent } from './employeehome/employeehome.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeFeedbackComponent } from './employee-feedback/employee-feedback.component';



@NgModule({
  declarations: [EmployeehomeComponent, CustomerAddComponent, CustomerListComponent, EmployeeFeedbackComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
