import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cylinder } from '../models/cylinder.model';

@Injectable({
  providedIn: 'root'
})
export class CylinderService {

  private url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.baseURL + 'cylinder/';
  }

  getAllCylinder() {
    return this.http.get<{ 'status': string, 'message': string, 'allCylinder': Cylinder[] }>(this.url);
  }

  getCylinder(cylinderId: number) {
    return this.http.get<{ 'status': string, 'message': string, 'cylinder': Cylinder }>(this.url + cylinderId);
  }

  getAllCylinderName() {
    return this.getAllCylinder().pipe<{ 'status': string, 'message': string, 'allCylinderName': { "cylinderId": number, "cylinderName": string }[] }>(map(responseData => {
      const allCylinderName: { "cylinderId": number, "cylinderName": string }[] = responseData.allCylinder.map(cylinder => {
        const cylinderId: number = cylinder.cylinderId;
        const cylinderName: string = cylinder.gas.gasId + " " + cylinder.cylinderCapacity + cylinder.cylinderUnit + " " + "(" + cylinder.gas.gasName + ")";
        return { cylinderId: cylinderId, cylinderName: cylinderName }
      });
      return { 'status': responseData.status, 'message': responseData.message, 'allCylinderName': allCylinderName };
    }));
  }
}
