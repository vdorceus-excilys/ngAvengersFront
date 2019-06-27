import { Component, Inject, OnInit } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { UserModel } from './user-model';
import { Credentials } from './security/security.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngFront';

  user: Credentials;
  data: any[];


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router){}

  ngOnInit(): void {
    this.user = this.storage.get('user') as Credentials;
  }

  updateToken(credentials: Credentials){
    this.user = credentials;
    this.router.navigate(['/home']);
  }

  logout(something) {
    this.user = undefined;
    this.storage.remove('user');
    this.router.navigate(['/']);
  }

  persist(key: string, value: any) {
      this.storage.set(key, value);
      this.data[key] = this.storage.get(key);
  }
}
