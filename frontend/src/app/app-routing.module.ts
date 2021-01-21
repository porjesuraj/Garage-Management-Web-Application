
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  {path : 'home', loadChildren: () => import('./home/home.module').then(m=> m.HomeModule)},

  {path : 'admin', loadChildren: () => import('./admin/admin.module').then(m=> m.AdminModule)},

  {path:'vendor',loadChildren:()=>import('./vendor/vendor.module').then(m=>m.VendorModule)},

  {path:'employee',loadChildren:()=>import('./employee/employee.module').then(m=>m.EmployeeModule)},

  {path : 'customer', loadChildren: () => import('./customer/customer.module').then(m=> m.CustomerModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
