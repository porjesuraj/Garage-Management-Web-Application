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
  userType:number = 0
  constructor(private authService : AuthService,
             private router : Router
              ) { }

  ngOnInit(): void {
  }
  onLogin()
  {
    if(this.userType == 1)
    {
      this.authService
    .adminLogin(this.email,this.password)
    .subscribe(response => {
      if(response['status'] == 'success')
      {
        const data = response['data']
        alert(`welcome user ${data['empName']}`)

        sessionStorage['token'] = data['token']
        sessionStorage['empName'] = data['empName']
        this.router.navigate(['/home'])
      }
      else
      {
        alert(`error : ${response['error']}`)
      }
    })
            console.log(this.userType)
    }
    else if(this.userType == 2)
    {
      this.authService
    .employeeLogin (this.email,this.password)
    .subscribe(response => {
      if(response['status'] == 'success')
      {
        const data = response['data']
        alert(`welcome user ${data['empName']}  `)

        sessionStorage['token'] = data['token']
        sessionStorage['empName'] = data['empName']

        this.router.navigate(['/home'])

      }
      else
      {
        alert(`error : ${response['error']}`)
      }
    })
            console.log(this.userType)
    }
    else
    {

    }


  }



}
