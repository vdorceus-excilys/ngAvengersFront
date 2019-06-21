import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import {CompanyModel} from '../company-model';
import {ComputerService} from '../computer.service';
import {CompanyService} from '../company.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  company: CompanyModel;

  companyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private computerService: ComputerService,
              private companyService: CompanyService,
              private router: Router) {
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.company = new CompanyModel()
    this.company.id = null
    this.company.name = this.companyForm.value['name']
    this.companyService.createCompany(this.company)
    this.router.navigate(['/computers/']);
  }
}
