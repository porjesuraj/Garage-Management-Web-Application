import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { AddServiceComponent } from './add-service/add-service.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'profile',component:ProfileComponent},
  {path : 'print-invoice', component : PrintInvoiceComponent},
  {path : 'add-service', component : AddServiceComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
