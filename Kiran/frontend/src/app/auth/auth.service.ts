import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  url1 = 'http://localhost:8080/gms/admin'
  url2 = 'http://localhost:8080/gms/vendor'
  url3 = 'http://localhost:8080/gms/employee'
  url4 = 'http://localhost:8080/gms/customer'



  constructor(private httpClient :HttpClient) { }



  adminLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url1 + '/signin',body)
  }

  vendorLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url2 + '/signin',body)
  }

  employeeLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url3 + '/signin',body)
  }

  customerLogin(email:string,password:string)
  {
    const body = {
      email : email,
      password : password
    }
       return this.httpClient.post(this.url4 + '/signin',body)
  }



}
