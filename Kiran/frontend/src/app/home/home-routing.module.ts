import { EnquirenowComponent } from './enquirenow/enquirenow.component';
import { ContactusComponent } from './contactus/contactus.component';
import { OfferComponent } from './offer/offer.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about-us',component:AboutusComponent},
  {path:'faqs',component:FaqsComponent},
  {path:'offers',component:OfferComponent},
  {path:'contact-us',component:ContactusComponent},
  {path:'enquire-now',component:EnquirenowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
