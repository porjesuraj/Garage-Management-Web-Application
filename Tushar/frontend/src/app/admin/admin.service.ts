import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  url = 'http://localhost:8080/admin'

  constructor(
    
    private httpClient: HttpClient) { }
    
    getVendors(){

     // add the token in the request header
     const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    
    return this.httpClient.get(this.url+"/vendorlist", httpOptions)
  }

  updateVendor(id, name: string, email: string, password: string, address: string, contact: string) {

    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };

   const body = {
    name: name,
    email: email,
    password: password,
    address: address,
    contact: contact
  }
  return this.httpClient.put(this.url + `/editVendor/${id}`, body, httpOptions)
  }

  addVendor(name: string, email: string, password: string, address: string, contact: string) {
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
      address: address,
      contact: contact
    }
    return this.httpClient.post(this.url + "/vendor/signup" , body, httpOptions)
    }
    
    getVendorDetails(id) {
      // add the token in the request header
      const httpOptions = {
       headers: new HttpHeaders({
         token: sessionStorage['token']
       })
     };
     return this.httpClient.get(this.url + `/vendor/${id}`, httpOptions)
    }

    deleteVendor(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      return this.httpClient.delete(this.url+`/deleteVendor/${id}`,httpOptions)
    }


    blockVendor(id){

      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };
      
      return this.httpClient.put(this.url +`/blockVendor/${id}`, httpOptions)
    }

    unblockVendor(id){
      const httpOptions = {
        headers: new HttpHeaders({
          token: sessionStorage['token']
          
        })
      };
      
            return this.httpClient.put(this.url +`/unblockVendor/${id}`, httpOptions)
    }
}
