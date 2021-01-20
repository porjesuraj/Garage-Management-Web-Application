import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

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

}
