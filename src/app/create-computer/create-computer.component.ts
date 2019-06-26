import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {ComputerService} from '../computer.service';
import {Router} from '@angular/router';
import {ComputerModel} from '../computer-model';
import {CompanyService} from '../company.service';
import {CompanyModel} from '../company-model';
import {MatInputModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ComputerDTOModel} from '../computerDTO-model';
import { Moment } from 'moment';

export const MY_FORMATS = {
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CreateComputerComponent implements OnInit {

  minDate = new Date(1943, 0, 1);
  maxDate = new Date(2020, 0, 1);

  computerForm: FormGroup;

  computerModel: ComputerModel;

  companyList: CompanyModel[];

  computer: ComputerDTOModel;


  constructor(private formBuilder: FormBuilder,
              private computerService: ComputerService,
              private companyService: CompanyService,
              private router: Router) {
  }
  ngOnInit() {
    this.initForm();
    this.companyService.getCompanies().subscribe(company => { this.companyList = company; } );

  }
  initForm() {
    this.computerForm = this.formBuilder.group({
      name: ['', Validators.required ],
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
      this.computer = new ComputerDTOModel();
      this.computer.name = formValue.name;

      if (formValue.introduced) { this.computer.introduced = this.formatDate(formValue.introduced); }

      if (formValue.discontinued) { this.computer.discontinued = this.formatDate(formValue.discontinued); }
      if (formValue.company != '') {
        this.computer.companyId = formValue.company;
        const company = this.companyList.find(comp => parseInt(comp.id, 10) == this.computer.companyId);
        this.computer.companyName = company.name;

        this.computerModel = {
          id: '0',
          name: this.computer.name,
          introduced: this.computer.introduced,
          discontinued: this.computer.discontinued,
          company: {
            id: this.computer.companyId.toString(),
            name: this.computer.companyName,
            version: 0 ,
          },
          version: 0,
        };

      } else {
        this.computerModel = {
          id: '0',
          name: this.computer.name,
          introduced: this.computer.introduced,
          discontinued: this.computer.discontinued,
          company: {
            id: null,
            name: null,
            version: 0,
          },
          version: 0,
        };
      }
      this.computerService.addComputer(this.computerModel).subscribe();
      this.router.navigate(['/computer/']);
  }
}
