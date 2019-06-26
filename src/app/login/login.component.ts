import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService} from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    invalidLogin: boolean = false;
    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }
  
    onSubmit() {
      if (this.loginForm.invalid) {
        return;
      }
      const body = new HttpParams()
        .set('username', this.loginForm.controls.username.value)
        .set('password', this.loginForm.controls.password.value)
        .set('grant_type', 'password');
  
      this.apiService.login(body.toString()).subscribe(data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        console.log(window.sessionStorage.getItem('token'));
        this.router.navigate(['list-user']);
      }, error => {
          alert(error.error.error_description)
      });
    }
  
    ngOnInit() {
      window.sessionStorage.removeItem('token');
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required]
      });
    }
  
  }