import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  authForm: FormGroup;
  error = null;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  onSetErrorToNull() {
    this.error = null;
  }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
    // console.log(this.isLoggedIn);
  }

  private initForm() {
    // Defines the Authentication Form
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  onClear() {
    this.authForm.reset();
  }
  onHandleError() {
    this.isLoading = false;
    this.error = null;
  }

  onSubmit() {
    // console.log(this.authForm);
    if (!this.authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.isLoggedIn) {
      this.authService.login(email, password)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(responseData => {
          this.router.navigateByUrl('/');
          this.authForm.reset();
        }, errorMessage => {
          this.error = errorMessage;
        });
    } else {
      this.authService.signup(email, password)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(responseData => {
          this.router.navigateByUrl('/');
          this.authForm.reset();
        }, errorMessage => {
          this.error = errorMessage;
        });
    }
  }

}
