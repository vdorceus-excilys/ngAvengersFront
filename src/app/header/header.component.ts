import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages = this.translate.getLangs();
  currentLanguage = this.translate.currentLang;
  active = 'computer';

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');
  }

  ngOnInit() { }

  useLanguage(language: string) {
    this.translate.use(language);
  }
  
  navigate(route: string) {
    this.active = route;
    this.router.navigate(['/' + route]);
  }
}
