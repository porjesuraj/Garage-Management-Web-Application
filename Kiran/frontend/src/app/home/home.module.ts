import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EnquirenowComponent } from './enquirenow/enquirenow.component';
import { OfferComponent } from './offer/offer.component';
import { FaqsComponent } from './faqs/faqs.component';


@NgModule({
  declarations: [HomeComponent, AboutusComponent, ContactusComponent, EnquirenowComponent, OfferComponent, FaqsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
