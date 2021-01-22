import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  url = 'http://localhost:8080/admin'

  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token']

    })
  };


  constructor(

    private httpClient: HttpClient) { }

  getVendors() {
    return this.httpClient.get(this.url + "/vendorlist", this.httpOptions)
  }

  updateVendor(id, name: string, email: string, password: string, address: string, contact: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      address: address,
      contact: contact
    }
    return this.httpClient.put(this.url + `/editVendor/${id}`, body, this.httpOptions)
  }

  addVendor(name: string, email: string, password: string, address: string, contact: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      address: address,
      contact: contact
    }
    return this.httpClient.post(this.url + "/vendor/signup", body, this.httpOptions)
  }

  getVendorDetails(id) {
    return this.httpClient.get(this.url + `/vendor/${id}`, this.httpOptions)
  }

  deleteVendor(id) {
    return this.httpClient.delete(this.url + `/deleteVendor/${id}`, this.httpOptions)
  }

  getCount(){
    return this.httpClient.get(this.url + "/AllCount", this.httpOptions)
  }

  getFeedback(){
    return this.httpClient.get(this.url + "/Feedbacklist", this.httpOptions)
  }

  deleteFeedback(id) {
    return this.httpClient.delete(this.url + `/deleteFeedback/${id}`, this.httpOptions)
  }

}
