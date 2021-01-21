import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { AdminhomeComponent } from "./adminhome/adminhome.component";

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'vendor-add', component: VendorAddComponent },
  { path: 'vendor-list', component: VendorListComponent },
  { path: 'home', component: AdminhomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
