import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:8080/employee'

  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token']
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }


  getCustomers() {
    return this.httpClient.get(this.url + "/Customerlist", this.httpOptions)
  }

  updateCustomer(id, name: string, email: string, password: string, birth_date: string, employee_id: string, contact: string, address: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      employee_id: employee_id,
      contact: contact,
      address: address
    }
    return this.httpClient.put(this.url + `/editCustomer/${id}`, body, this.httpOptions)
  }

  addCustomer(name: string, email: string, password: string, birth_date: string, employee_id: string, contact: string, address: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      employee_id: employee_id,
      contact: contact,
      address: address
    }
    return this.httpClient.post(this.url + "/customer/signup", body, this.httpOptions)
  }

  getCustomerDetails(id) {
    return this.httpClient.get(this.url + `/customer/${id}`, this.httpOptions)
  }


  deleteCustomer(id) {
    return this.httpClient.delete(this.url + `/deleteCustomer/${id}`, this.httpOptions)
  }


  getCount() {
    return this.httpClient.get(this.url + "/AllCount", this.httpOptions)
  }

  getFeedback(){
    return this.httpClient.get(this.url + "/Feedbacklist", this.httpOptions)
  }

  deleteFeedback(id) {
    return this.httpClient.delete(this.url + `/deleteFeedback/${id}`, this.httpOptions)
  }


}
