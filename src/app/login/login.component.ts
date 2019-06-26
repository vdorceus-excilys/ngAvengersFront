import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../security/security.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  @Output() eventEmitter: EventEmitter<Credentials> = new EventEmitter();

  constructor(private router: Router) { }


  ngOnInit() {
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    } as Credentials;

    this.eventEmitter.emit(credentials);
  }

}
