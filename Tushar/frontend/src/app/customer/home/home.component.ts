import { CustomerService } from 'src/app/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email = sessionStorage.getItem("email")
  id = sessionStorage.getItem("id")

  customer=null

  vendorsCount
  employeesCount
  customersCount
  serviceRequestCount

  constructor(
    private router:Router,
    private customerService:CustomerService

  ) { }

  ngOnInit(): void {
    this.customerService.getCount().
    subscribe(response=>{
      if(response['status']=='success'){
        this.vendorsCount = response['vendors']
        this.employeesCount = response['employees']
        this.customersCount = response['customers']
        this.serviceRequestCount = response['serviceRequest']
      }
    })
  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('email')
    this.router.navigate(['/home'])
  }



}
