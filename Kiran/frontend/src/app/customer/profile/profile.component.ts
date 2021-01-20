import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
