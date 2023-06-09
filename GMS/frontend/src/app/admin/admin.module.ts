import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';



@NgModule({
  declarations: [VendorAddComponent, VendorListComponent, AdminhomeComponent, AdminFeedbackComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
