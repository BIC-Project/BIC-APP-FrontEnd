import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hidePasswordFlag: boolean;
  loginForm: FormGroup;
  isLoadingFlag: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // initializing password toogle button
    this.hidePasswordFlag = true;

    // initializing loading flag
    this.isLoadingFlag = false;

    //initializing formgroup
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z_][0-9A-Za-z_$]*$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
      ]),
    });
  }

  onSubmit(form: NgForm): void {
    if (!this.loginForm.valid) {
      return;
    }

    const userName: string = this.loginForm.value.userName;
    const password: string = this.loginForm.value.password;

    this.isLoadingFlag = true;
    this.authService.login(userName, password).subscribe(
      (response) => {
        this.isLoadingFlag = false;
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        //set loading spinner to false
        this.isLoadingFlag = false;
        //generate notification
        this.openNotificationBar(errorMessage, 'Dismiss', 7000);
      }
    );
    form.resetForm();
  }

  getValidationErrorMessage(formElement: string): string[] {
    let errorMsgList: string[] = [];
    if (formElement == 'userName') {
      if (this.loginForm.get('userName').hasError('required'))
        errorMsgList.push('You must enter a value.');

      if (
        this.loginForm.get('userName').hasError('minlength') ||
        this.loginForm.get('userName').hasError('maxlength')
      )
        errorMsgList.push('Username must be between 3-10 characters.');

      if (this.loginForm.get('userName').hasError('pattern'))
        errorMsgList.push('userName must be alphanumeric.');
    } else if (formElement == 'password') {
      if (this.loginForm.get('password').hasError('required'))
        errorMsgList.push('You must enter a value.');

      if (
        this.loginForm.get('password').hasError('minlength') ||
        this.loginForm.get('password').hasError('maxlength')
      )
        errorMsgList.push('Password must be between 5-10 characters.');
    }
    return errorMsgList;
  }

  openNotificationBar(message: string, action: string, duration: number) {
    this.notificationBar.open(message, action, { duration: duration });
  }
}
