import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { JobsComponent } from './jobs/jobs.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    HomeComponent,
    ProfileComponent,
    JobsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class CustomerModule { }
