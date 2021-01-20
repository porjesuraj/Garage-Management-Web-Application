import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  //userType:number = 0
  constructor(
   // private toastr: ToastrService,
    private authService : AuthService,
    private router : Router
              ) { }

  ngOnInit(): void {
  }


onLogin() {
  this.authService.login(this.email, this.password).subscribe(response => {
      if (response['status'] == 'success') {
        //const data = response['data']
        //console.log(data)

        // cache the user info
        sessionStorage['token'] = response['token']
        sessionStorage['role'] = response['role']

        // goto the dashboard
        this.router.navigate(['/admin/home'])
        alert(`Welcome`)

      } else {
        alert('invalid email or password')
      }
    })
}

}

