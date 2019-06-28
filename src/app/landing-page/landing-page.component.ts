import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  @Input() computerNumber: number;
  @Input() companyNumber: number;
  @Input() userNumber: number;

  noInternetMessage = {
    message: '<h1>Please make sure that you are connected to internet</h1>',
    type: 'is-danger',
    position: 'bottom-right',
    dismissible: true,
    duration: 2000,
    animate: { in: 'fadeIn', out: 'fadeOut' }
  };

  constructor(private computerService: ComputerService,
              private companyService: CompanyService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getNumberOfComputers();
    this.getNumberOfCompanies();
    this.getNumberOfUsers();
  }

  getNumberOfComputers(): void {
    this.computerService.getComputers().subscribe(
      result => this.computerNumber = result.length,
      error => toast(this.noInternetMessage)
      );
  }

  getNumberOfCompanies(): void {
    this.companyService.getCompanies().subscribe(result =>
      this.companyNumber = result.length
      );
  }

  getNumberOfUsers(): void {
    this.userService.getUsers().subscribe(result =>
      this.userNumber = result.length
      );
  }

}
