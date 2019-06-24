import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ComputerService} from '../computer.service';
import {Router} from '@angular/router';
import {ComputerModel} from '../computer-model';
import {CompanyService} from '../company.service';
import {CompanyModel} from '../company-model';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.scss']
})
export class CreateComputerComponent implements OnInit {
  computerForm: FormGroup;
  computer: ComputerModel;
  companyList: CompanyModel[];


  constructor(private formBuilder: FormBuilder,
              private computerService: ComputerService,
              private companyService: CompanyService,
              private router: Router) {
  }
  ngOnInit() {
    this.initForm();
    console.log(this.companyList);
    this.companyService.getCompanies().subscribe(data =>{this.companyList = data } );

  }
  initForm() {
    this.computerForm = this.formBuilder.group({
      name: ['', Validators.required],
      introduced: '',
      discontinued: '',
      company: ''
    });
  }

  onSubmitForm() {
      const formValue = this.computerForm.value;
      this.computer = new ComputerModel();
      this.computer.id = null;
      this.computer.name = formValue['name'],
      this.computer.introduced = formValue['introduced'],
      this.computer.discontinued = formValue['discontinued'],
      this.computer.company = formValue['company']

      this.computerService.addComputer(this.computer).subscribe();
      this.router.navigate(['/computer/']);
  }
}
