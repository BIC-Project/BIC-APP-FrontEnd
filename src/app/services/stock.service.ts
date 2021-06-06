import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url: string;

  constructor(private http: HttpClient
    , private router: Router) {
    this.url = environment.baseURL + 'stock/';
  }

  getStockByLocation(locationId: number) {
    return this.http.get(this.url + locationId);
  }

  getStockByLocationAndByCustomer(locationId: number, customerId: number) {
    return this.http.get(this.url + locationId + "/" + customerId);
  }

  getStockByLocationAndByCustomerByCilinder(locationId: number, customerId: number, cylinderId: number) {
    return this.http.get(this.url + locationId + "/" + customerId + "/" + cylinderId);
  }
}
