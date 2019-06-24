import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages = this.translate.getLangs();
  currentLanguage = this.translate.currentLang;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
