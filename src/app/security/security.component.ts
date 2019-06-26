import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserModel } from '../user-model';

export interface Credentials {
  username: string;
  password: string;
  role: string;
}
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  @Output() eventEmitter: EventEmitter<Credentials> = new EventEmitter();
  users: UserModel[];
  currentUser: UserModel;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( data => {this.users = data; });
  }

  authenticate(credentials) {
    console.log('authenticate');
    let valid: boolean;
    this.currentUser = this.users.find(user => user.username === credentials.username);
    console.log(this.currentUser);
    if (this.currentUser === undefined) {
      console.log('user not found in list of users');
    } else if (this.currentUser.enabled) {
      this.userService.checkPassword(credentials.password, this.currentUser.password).subscribe(
        (state) => {
          valid = state as boolean;
          if (valid) {
            credentials.password = this.currentUser.password;
            credentials.role = this.currentUser.role;
            this.storage.set('user', credentials);
            this.eventEmitter.emit(credentials);
            console.log('successful login');
            console.log(credentials);
          } else {
            console.log('failed login');
          }
        }
      );
    } else {
      console.log('user not enabled');
    }
  }


}
