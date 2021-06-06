import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private url: string;

  constructor(private http: HttpClient
    , private router: Router) {
    this.url = environment.baseURL + 'location/';
  }

  getAllLocation() {
    return this.http.get<{ 'status': string, 'message': string, 'allLocation': Location[] }>(this.url);
  }

  getLocation(locationId: number) {
    return this.http.get<{ 'status': string, 'message': string, 'location': Location }>(this.url + locationId);
  }
}
