import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerModel } from '../computer-model';
import {CompanyModel} from '../company-model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-update-computer',
  templateUrl: './update-computer.component.html',
  styleUrls: ['./update-computer.component.scss']
})
export class UpdateComputerComponent implements OnInit {

  computerForm: FormGroup;

  companyList: CompanyModel[];

  private routeSub: Subscription;

  id: string;

  computer: ComputerModel;
  constructor(private formBuilder: FormBuilder,
              private userService: ComputerService,
              private router: Router,
              private companyService: CompanyService,
              private computerService: ComputerService,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = (params.id);
    });

    this.companyService.getCompanies().subscribe(data => { this.companyList = data; });
    this.computerService.getComputer(this.id).subscribe(data => this.computer = data);
    this.initForm();
  }

  initForm() {
    this.computerForm = this.formBuilder.group({
      id: '',
      name: '',
      introduced: '',
      discontinued: '',
      company: ''
    });
  }

  onSubmitForm() {
    const formValue = this.computerForm.value;

    if (formValue.name != '') { this.computer.name = formValue.name; }
    if (formValue.introduced != '') { this.computer.introduced = formValue.introduced; }
    if (formValue.discontinued != '') { this.computer.discontinued = formValue.discontinued; }
    if (formValue.company != '') { this.computer.company = formValue.company; }


    console.log(this.computerForm.value);
    console.log('computer id : ' + this.computer.id + 'computer name : ' + this.computer.name +
      'computer introduced : ' + this.computer.introduced + 'computer discontinued : ' + this.computer.discontinued +
      'computer company id : ' + this.computer.company.id + 'computer company name : ' + this.computer.company.name);
    this.computerService.updateComputer(this.computer).subscribe();

    this.router.navigate(['/computer/update/2']);
  }

}


