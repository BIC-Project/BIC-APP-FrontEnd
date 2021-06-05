import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;
  constructor(private http: HttpClient, private authService: AuthService) { }


  ngOnInit(): void {

    this.getData().subscribe(resp => this.data = resp, error => this.data = error);
  }

  private getData() {
    return this.http.get(environment.baseURL + 'customer/');
  };



}
