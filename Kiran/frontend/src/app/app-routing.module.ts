import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  // {path: '', redirectTo : '/home', pathMatch : 'full'},
 {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
 {path : 'customer', loadChildren: () => import('./customer/customer.module').then(m=> m.CustomerModule)},
 {path : 'home', loadChildren: () => import('./home/home.module').then(m=> m.HomeModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
