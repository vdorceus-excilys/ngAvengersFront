import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Credentials } from '../security/security.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages = this.translate.getLangs();
  currentLanguage = this.translate.currentLang;
  active = 'computer';
  paginator: MatPaginatorIntl;
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
  @Input() credentials: Credentials;
  activeDropdown = false;

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');
  }

  ngOnInit() { }

  logout() {
    console.log('logout - header');
    this.eventEmitter.emit('logging out from header');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  navigate(route: string) {
    this.active = route;
    this.router.navigate(['/' + route]);
  }

  toggleDropdown() {
    this.activeDropdown = !this.activeDropdown;
  }
}
