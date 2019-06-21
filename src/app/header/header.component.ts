import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  active = 'computer';
  constructor(private router: Router) { }

  ngOnInit() { }

  navigate(route: string) {
    this.active = route;
    this.router.navigate(['/' + route]);
  }
}
