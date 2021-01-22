import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



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
    private authService: AuthService,
    private router: Router
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
        sessionStorage['email'] = response['email']
        sessionStorage['id'] = response['id']

        // goto the dashboard
        if (response['role'] == 'ADMIN') {
          this.router.navigate(['/admin/home'])
          alert(`Welcome ${sessionStorage.getItem('email')}`)
        }
        else if (response['role'] == 'VENDOR') {
          this.router.navigate(['/vendor/home'])
          alert(`Welcome ${sessionStorage.getItem('email')}`)
        }
        else if (response['role'] == 'EMPLOYEE') {
          this.router.navigate(['/employee/home'])
          alert(`Welcome ${sessionStorage.getItem('email')}`)
        }
        else if (response['role'] == 'CUSTOMER') {
          this.router.navigate(['/customer/home'])
          alert(`Welcome ${sessionStorage.getItem('email')} `)
        }
      } else {
        alert('invalid email or password')
      }
    })
  }

}
