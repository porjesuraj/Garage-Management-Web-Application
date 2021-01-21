import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:8080/employee'

  constructor(
    
    private httpClient: HttpClient) { }
    

  getCustomers(){

    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };
   
   return this.httpClient.get(this.url+"/Customerlist", httpOptions)
 }


  updateCustomer(id, name: string, email: string, password: string, birth_date: string, employee_id: string, contact:string, address:string) {

    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };

   const body = {
    name: name,
    email: email,
    password: password,
    birth_date: birth_date,
    employee_id: employee_id,
    contact:contact,
    address:address
  }
  return this.httpClient.put(this.url + `/editEmployee/${id}`, body, httpOptions)
  }

  addCustomer( name: string, email: string, password: string, birth_date: string, employee_id: string, contact:string, address:string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      employee_id: employee_id,
      contact:contact,
      address:address
    }
    return this.httpClient.post(this.url + "/addEmployee" , body, httpOptions)
    }
   
    getCustomerDetails(id) {
      // add the token in the request header
      const httpOptions = {
       headers: new HttpHeaders({
         token: sessionStorage['token']
       })
     };
     return this.httpClient.get(this.url + `/employee/${id}`, httpOptions)
    }


    deleteCustomer(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      return this.httpClient.delete(this.url+`/deleteCustomer/${id}`,httpOptions)
    }


    blockCustomer(id){

      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      
      return this.httpClient.put(this.url +`/blockEmployee/${id}`, httpOptions)
    }

    unblockCustomer(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
          
        })
      };
      
            return this.httpClient.put(this.url +`/unblockEmployee/${id}`, httpOptions)
    }
}
