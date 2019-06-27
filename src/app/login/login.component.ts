import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../security/security.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  languages = this.translate.getLangs();
  currentLanguage = this.translate.currentLang;
  username: string;
  password: string;
  @Output() eventEmitter: EventEmitter<Credentials> = new EventEmitter();

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');
  }


  ngOnInit() {
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    } as Credentials;

    this.eventEmitter.emit(credentials);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
