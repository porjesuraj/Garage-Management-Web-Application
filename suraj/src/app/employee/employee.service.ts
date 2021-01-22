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
    return this.httpClient.put(this.url + `/editEmployee/${id}`, body, this.httpOptions)
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
    return this.httpClient.post(this.url + "/addEmployee", body, this.httpOptions)
  }

  getCustomerDetails(id) {
    return this.httpClient.get(this.url + `/employee/${id}`, this.httpOptions)
  }


  deleteCustomer(id) {
    return this.httpClient.delete(this.url + `/deleteCustomer/${id}`, this.httpOptions)
  }


  blockCustomer(id) {
    return this.httpClient.put(this.url + `/blockEmployee/${id}`, this.httpOptions)
  }

  unblockCustomer(id) {
    return this.httpClient.put(this.url + `/unblockEmployee/${id}`, this.httpOptions)
  }

  getCount() {
    return this.httpClient.get(this.url + "/AllCount", this.httpOptions)
  }

  addStock(item_name: string, quantity:number,price:number) {
    const body = {
      item_name: item_name,
      quantity : quantity,
      price: price
    }
    return this.httpClient.post(this.url + "/addStock", body, this.httpOptions)
  }
  updateStock(id:number, item_name: string, quantity:number,price:number) {
    const body = {
      item_name: item_name,
      quantity : quantity,
      price: price
    }
    return this.httpClient.put(this.url + `/updateStock/${id}`, body, this.httpOptions)
  }

  getStockDetails(id) {
    return this.httpClient.get(this.url + `/stockDetails/${id}`, this.httpOptions)
  }

  
  getStocks() {
    return this.httpClient.get(this.url + "/AllStock", this.httpOptions)
  }

  deleteStock(id) {
    return this.httpClient.delete(this.url + `/deleteStock/${id}`, this.httpOptions)
  }

}
