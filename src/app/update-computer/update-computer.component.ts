import { Component, OnInit, Inject } from '@angular/core';
import {ComputerService} from '../computer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerDTOModel } from '../computerDTO-model';
import {CompanyModel} from '../company-model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ComputerModel} from '../computer-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


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

  computer: ComputerDTOModel;

  companyModel: CompanyModel;

  constructor(private formBuilder: FormBuilder,
              private userService: ComputerService,
              private router: Router,
              private companyService: CompanyService,
              private computerService: ComputerService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<UpdateComputerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.id = data.id;
              }


  ngOnInit() {

    this.companyService.getCompanies().subscribe(companies => { this.companyList = companies; });
    this.computerService.getComputerModel(this.id).subscribe(computer => {this.computer = computer; });

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
    if (formValue.company != '') { this.computer.companyId = formValue.company;
                                   const company = this.companyList.find(comp => parseInt(comp.id, 10) == this.computer.companyId) ;
                                   this.computer.companyName = company.name;
    }
    this.computerService.updateComputer(this.computer).subscribe(res => {this.cancel(); });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
