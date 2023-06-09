import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'http://localhost:8080/customer'
  url2 = 'http://localhost:8080/auth/customer'

  email= sessionStorage.getItem("email")
  id = sessionStorage.getItem("id")


  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token']
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }


  addFeedback(id:number,feedback_message: string) {
    console.log(id)
    console.log(feedback_message)
    const body = {
      customer_id :this.id,
      feedback_message: feedback_message
    }
    return this.httpClient.post(this.url + "/addFeedback", body, this.httpOptions)
  }

  getProfile(id) {
    return this.httpClient.get(this.url + `/${id}`, this.httpOptions)
  }

  updateProfile(body) {
    return this.httpClient.put(this.url + `/editCustomer/${this.id}`,body, this.httpOptions)
  }

  signup(name: string, birth_date: Date, contact: string, address: string, email: string, employee_id: number, password: string) {
    const body = {
      name: name,
      birth_date: birth_date,
      contact: contact,
      address: address,
      email: email,
      password: password,
      employee_id: 1

    }
    return this.httpClient.post(this.url2 + "/signup", body)
  }

  getCount(){
    return this.httpClient.get(this.url + "/AllCount",this.httpOptions)
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
    return this.httpClient.post(this.url + `/addService/${this.id}`, body, this.httpOptions)
  }

  getInvoiceDetails(id){
    return this.httpClient.get(this.url + `/viewInvoice/${id}`, this.httpOptions)
  }



}
