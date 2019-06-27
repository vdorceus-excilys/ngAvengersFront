import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  @Input() computerNumber: number;
  @Input() companyNumber: number;
  @Input() userNumber: number;

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
    this.computerService.getComputers().subscribe(result =>
      this.computerNumber = result.length
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
