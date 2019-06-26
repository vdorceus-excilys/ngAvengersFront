import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-component',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  routeParams: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
    console.log(`${this.routeParams}`);
  }

}
