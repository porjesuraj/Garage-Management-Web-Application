import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'jobs',component:JobsComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'profile',component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
