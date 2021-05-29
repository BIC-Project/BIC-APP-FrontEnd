import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePasswordFlag: boolean;
  constructor() {
    this.hidePasswordFlag = true;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Hello");
  }

}
