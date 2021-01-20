import { CustomerModule } from './../customer.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('FirstName')
    sessionStorage.removeItem('LastName')

    this.router.navigate(['/auth/login'])
  }

  onProfile(){
    this.router.navigate(['customer/profile'])
  }

}
