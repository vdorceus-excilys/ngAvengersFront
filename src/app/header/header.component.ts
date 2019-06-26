import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';

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

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.router.navigate(['/computer']);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  navigate(route: string) {
    this.active = route;
    this.router.navigate(['/' + route]);
  }

}
