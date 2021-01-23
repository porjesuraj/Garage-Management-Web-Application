import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  email= sessionStorage.getItem("email")
  id = sessionStorage.getItem("id")

  url = 'http://localhost:8080/vendor'

  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token']
    })
  };

  constructor(

    private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get(this.url + "/employeeList", this.httpOptions)
  }

  getCustomers() {
    return this.httpClient.get(this.url + "/Customerlist", this.httpOptions)
  }


  updateEmployee(id, name: string, email: string, password: string, birth_date: string, vendor_id: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      vendor_id: vendor_id
    }
    return this.httpClient.put(this.url + `/editEmployee/${id}`, body, this.httpOptions)
  }

  addEmployee(name: string, email: string, password: string, birth_date: Date, vendor_id: number) {
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      vendor_id: vendor_id
    }
    return this.httpClient.post(this.url + "/addEmployee", body, this.httpOptions)
  }

  getEmployeeDetails(id) {
    return this.httpClient.get(this.url + `/employee/${id}`, this.httpOptions)
  }

  deleteEmployee(id) {
    return this.httpClient.delete(this.url + `/deleteEmployee/${id}`, this.httpOptions)
  }

  deleteCustomer(id) {
    return this.httpClient.delete(this.url + `/deleteCustomer/${id}`, this.httpOptions)
  }

  blockEmployee(id) {
    return this.httpClient.put(this.url + `/blockEmployee/${id}`, this.httpOptions)
  }

  unblockEmployee(id) {
    return this.httpClient.put(this.url + `/unblockEmployee/${id}`, this.httpOptions)
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

  getProfile(id) {
    return this.httpClient.get(this.url + `/${id}`, this.httpOptions)
  }
  
}
