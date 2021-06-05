import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.baseURL + 'customer/';
  }

  getAllCustomers() {
    return this.http.get<{ 'status': string, 'message': string, 'allCustomer': Customer[] }>(this.url);
  }

  getCustomer(customerId: number) {
    this.http.get<{ 'status': string, 'message': string, 'customer': Customer }>(this.url + customerId);
  }

  createCustomer(customer: Customer) {
    // if(localStorage.getItem)
    this.http.post(this.url, customer);
  }
}
