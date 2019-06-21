import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../company-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ComputerService} from '../computer.service';
import {Router} from '@angular/router';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {

  companyForm: FormGroup;

  company: CompanyModel;

  private routeSub: Subscription;

  id: string

  constructor(private formBuilder: FormBuilder,
              private userService: ComputerService,
              private router: Router,
              private companyService: CompanyService,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.initForm();

    this.routeSub = this.route.params.subscribe(params => {
      this.id = (params['id']);
    });

    this.companyService.getCompany(this.id).subscribe(data =>this.company=data)
    this.initForm();

    console.log(this.id);

  }

  initForm() {
    this.companyForm = this.formBuilder.group({
      name: '',

    });
  }

  onSubmitForm() {
    const formValue = this.companyForm.value;
    if (formValue['name'] != '') { this.company.name = formValue['name']; }

    this.companyService.updateCompany(this.company)
    this.router.navigate(['/companies']);
  }

}
