import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserModel } from '../user-model';
import { toast } from 'bulma-toast';

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
  BadCredentials = {
    message: '<h1 id="toast">Bad credentials</h1>',
    type: 'is-danger',
    position: 'bottom-right',
    dismissible: true,
    duration: 10000,
    animate: { in: 'fadeIn', out: 'fadeOut' }
  };

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( data => {this.users = data; });
  }

  authenticate(credentials) {
    let valid: boolean;
    this.currentUser = this.users.find(user => user.username === credentials.username);
    if (this.currentUser === undefined) {
      // User not found in list of users
      toast(this.BadCredentials);
    } else if (this.currentUser.enabled) {
      this.userService.checkPassword(credentials.password, this.currentUser.password).subscribe(
        (state) => {
          valid = state as boolean;
          if (valid) {
            credentials.password = this.currentUser.password;
            credentials.role = this.currentUser.role;
            this.storage.set('user', credentials);
            this.eventEmitter.emit(credentials);
          } else {
            // failed login
            toast(this.BadCredentials);
          }
        }
      );
    } else {
      // user not enabled
    }
  }


}
