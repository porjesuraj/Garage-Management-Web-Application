import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  email= sessionStorage.getItem("email")
  id = sessionStorage.getItem("id")

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
    console.log('get customers')
    return this.httpClient.get(this.url + `/Customerlist`, this.httpOptions)
  }

  updateCustomer(id, name: string, email: string, password: string, birth_date: string, employee_id: string, contact: string, address: string) {
    const body = {
      name: name,
      email: email,
      password: password,
      birth_date: birth_date,
      employee_id:employee_id,
      contact: contact,
      address: address
    }
    return this.httpClient.put(this.url+ `/editCustomer/${id}`, body, this.httpOptions)
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


  blockCustomer(id) {
    return this.httpClient.put(this.url + `/blockCustomer/${id}`, this.httpOptions)
  }

  unblockCustomer(id) {
    return this.httpClient.put(this.url + `/unblockCustomer/${id}`, this.httpOptions)
  }

  getCount() {
    return this.httpClient.get(this.url + "/AllCount", this.httpOptions)
  }


  addService(cust_id:number ,vehicle_reg_no:string, vehicle_type:string , vehicle_brand:string , vehicle_model:string, delivery_type:string){

    const body = {
      vehicle_reg_no: vehicle_reg_no,
      vehicle_type: vehicle_type,
      vehicle_brand: vehicle_brand,
      vehicle_model: vehicle_model,
      delivery_type: delivery_type,
      status:'PENDING'

    }
    return this.httpClient.post(this.url + `/customer/addService/${cust_id}`, body, this.httpOptions)
  }


  getServiceDetails(id){
    return this.httpClient.get(this.url + `/service/${id}`, this.httpOptions)
  }

  getInvoiceDetails(id){
    return this.httpClient.get(this.url + `/viewInvoice/${id}`, this.httpOptions)
  }

  generateInvoice(id:number, total:number ,discount:number, labour_charges:number, out_date:Date, product_charges:number, service_date:Date, status:string  , vehicle_reg_no:number, vehicle_type:string , vehicle_brand:string , vehicle_model:string , delivery_type:string)
  {
    const body = {
      vehicle_reg_no: vehicle_reg_no,
      vehicle_type: vehicle_type,
      vehicle_brand: vehicle_brand,
      vehicle_model: vehicle_model,
      delivery_type: delivery_type,
      total:total,
      discount:discount/100,
      labour_charges:labour_charges,
      out_date:out_date,
      product_charges:product_charges,
      service_date:service_date,
      status:'PENDING'

    }
    return this.httpClient.put(this.url + `/customer/service/createInvoice/${id}`, body, this.httpOptions)
  }

  getFeedback(){
    return this.httpClient.get(this.url + "/Feedbacklist", this.httpOptions)
  }

  deleteFeedback(id) {
    return this.httpClient.delete(this.url + `/deleteFeedback/${id}`, this.httpOptions)
  }

  getProfile(id) {
    return this.httpClient.get(this.url + `/${this.id}`, this.httpOptions)
  }

  updateProfile(body) {
    return this.httpClient.put(this.url + `/editEmployee/${this.id}`,body, this.httpOptions)
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
