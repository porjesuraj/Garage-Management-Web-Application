import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  email = sessionStorage.getItem("email")

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService

  ) { }

  ngOnInit(): void {

  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')

    this.router.navigate(['/home'])
  }

}
