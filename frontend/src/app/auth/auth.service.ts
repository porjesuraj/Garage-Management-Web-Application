import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  url1 = 'http://localhost:3000/admin'

  url2 = 'http://localhost:3000/employee'
  


  constructor(private httpClient :HttpClient) { }

  

  adminLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url1 + '/signin',body)
  }

  employeeLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url1 + '/signin',body)
  }
  

 

   
}
