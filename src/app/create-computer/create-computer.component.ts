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
import {ComputerDTO} from '../list-computer/list-computer.component';
import {ComputerDTOModel} from '../computerDTO-model';

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.scss']
})
export class CreateComputerComponent implements OnInit {

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

  onSubmitForm() {
      const formValue = this.computerForm.value;
      this.computer = new ComputerDTOModel();
      this.computer.name = formValue.name;
      this.computer.introduced = formValue.introduced;
      this.computer.discontinued = formValue.discontinued;
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
