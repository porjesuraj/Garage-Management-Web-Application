import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
 
  url = 'http://localhost:8080/vendor'

  constructor(
    
    private httpClient: HttpClient) { }
    
    getEmployees(){

     // add the token in the request header
     const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    
    return this.httpClient.get(this.url+"/employeeList", httpOptions)
  }

  getCustomers(){

    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };
   
   return this.httpClient.get(this.url+"/Customerlist", httpOptions)
 }


  updateEmployee(id, name: string, email: string, password: string, birth_date: string, vendor_id: string) {

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
    vendor_id: vendor_id
  }
  return this.httpClient.put(this.url + `/editEmployee/${id}`, body, httpOptions)
  }

  addEmployee(name: string, email: string, password: string, birth_date: Date, vendor_id: number) {
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
      vendor_id: vendor_id
    }
    return this.httpClient.post(this.url + "/addEmployee" , body, httpOptions)
    }
   
    getEmployeeDetails(id) {
      // add the token in the request header
      const httpOptions = {
       headers: new HttpHeaders({
         token: sessionStorage['token']
       })
     };
     return this.httpClient.get(this.url + `/employee/${id}`, httpOptions)
    }

    deleteEmployee(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      return this.httpClient.delete(this.url+`/deleteEmployee/${id}`,httpOptions)
    }

    deleteCustomer(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      return this.httpClient.delete(this.url+`/deleteCustomer/${id}`,httpOptions)
    }


    blockEmployee(id){

      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      
      return this.httpClient.put(this.url +`/blockEmployee/${id}`, httpOptions)
    }

    unblockEmployee(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
          
        })
      };
      
            return this.httpClient.put(this.url +`/unblockEmployee/${id}`, httpOptions)
    }
}
