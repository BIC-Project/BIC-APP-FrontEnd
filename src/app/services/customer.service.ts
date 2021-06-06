import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { Roles } from '../models/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.baseURL + 'customer/';
  }

  getAllCustomer() {
    return this.http.get<{ 'status': string, 'message': string, 'allCustomer': Customer[] }>(this.url);
  }

  // getAllCustomerName() {
  //   return this.getAllCustomer().pipe<{ 'status': string, 'message': string, 'allCustomerName': s{}[] }>(map(responseData => {
  //     const allcustomerName: string[] = responseData
  //       .allCustomer
  //       .map(customer => customer.customerName);
  //     return { status: responseData.status, message: responseData.message, allCustomerName: allcustomerName };
  //   }));
  // }

  getCustomer(customerId: number) {
    this.http.get<{ 'status': string, 'message': string, 'customer': Customer }>(this.url + customerId);
  }

  createCustomer(customer: Customer) {
    this.http.post(this.url, customer);
  }

  updateCustomer(customer: Customer) {
    this.http.put(this.url, customer);
  }
}
