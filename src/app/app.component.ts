import { Component, Inject, OnInit } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  title = 'ngFront';

  user: UserModel;
  data: any[];


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService){}

  ngOnInit(): void {
    this.user = this.storage.get('user') as UserModel;
  }

  persist(key: string, value: any) {
      this.storage.set(key, value);
      this.data[key] = this.storage.get(key);
  }
}
