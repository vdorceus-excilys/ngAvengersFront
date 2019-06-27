import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerDTOModel } from '../computerDTO-model';
import {CompanyModel} from '../company-model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';


export const MY_FORMATS = {
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
  },
};


@Component({
  selector: 'app-update-computer',
  templateUrl: './update-computer.component.html',
  styleUrls: ['./update-computer.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class UpdateComputerComponent implements OnInit {

  minDate = new Date(1943, 0, 1);
  maxDate = new Date(2020, 0, 1);

  introducedDate = new FormControl(moment());
  discontinuedDate = new FormControl(moment());

  computerForm: FormGroup;

  companyList: CompanyModel[];

  private routeSub: Subscription;

  id: string;

  computer: ComputerDTOModel;

  companyModel: CompanyModel;

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

    this.companyService.getCompanies().subscribe(companies => { this.companyList = companies; });
    this.computerService.getComputerModel(this.id).subscribe(computer => {
      this.computer = computer;
      this.introducedDate = new FormControl(moment(computer.introduced, 'DD-MM-YYYY'));
      this.discontinuedDate = new FormControl(moment(computer.discontinued, 'DD-MM-YYYY'));
      console.log(computer.introduced.toString());
    });



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

  formatDate(date: Moment) {
    return date.clone().locale('en').format('DD-MM-YYYY');
  }

  onSubmitForm() {
    const formValue = this.computerForm.value;

    if (formValue.name != '') { this.computer.name = formValue.name; }
    if (formValue.introduced != '' && formValue.introduced) {
      this.computer.introduced = this.formatDate(formValue.introduced);
    }
    if (formValue.discontinued != '' && formValue.discontinued) {
      this.computer.discontinued = this.formatDate(formValue.discontinued);
    }
    if (formValue.company != '') { this.computer.companyId = formValue.company;
                                   const company = this.companyList.find(comp => parseInt(comp.id, 10) == this.computer.companyId) ;
                                   this.computer.companyName = company.name;
    }

    this.computerService.updateComputer(this.computer).subscribe();
    this.router.navigate(['/computer']);
  }
}
