import { Component, OnInit } from '@angular/core';
import {CompanyModel} from '../company-model';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ComputerService} from '../computer.service';
import {Router} from '@angular/router';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {

  companyForm: FormGroup;

  company: CompanyModel;

  private routeSub: Subscription;

  id: string;

  constructor(private formBuilder: FormBuilder,
              private userService: ComputerService,
              private router: Router,
              private companyService: CompanyService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<UpdateCompanyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.id = data.id;
               }

  ngOnInit() {
    this.initForm();

    this.companyService.getCompany(this.id).subscribe(comp => this.company = comp);
    this.initForm();

  }

  initForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required]

    });
  }

  onSubmitForm() {
    const formValue = this.companyForm.value;
    if (formValue['name'] != '') {
      this.company.name = formValue['name'];
    }

    this.companyService.updateCompany(this.company).subscribe(res => this.cancel());
  }
  cancel(): void {
    this.dialogRef.close();
  }


}
