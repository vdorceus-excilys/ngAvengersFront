import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputerDTOModel } from '../computerDTO-model';
import {CompanyModel} from '../company-model';
import {CompanyService} from '../company.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ComputerModel} from '../computer-model';


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

  computerModel: ComputerModel;

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
    this.computerModel = {
      id: this.computer.id,
      name: this.computer.name,
      introduced: this.computer.introduced,
      discontinued: this.computer.discontinued,
      company: {
        id: this.computer.companyId.toString(),
        name: this.computer.companyName,
        version: 0
      },
      version: this.computer.version,

    }
    this.computerService.updateComputer(this.computerModel).subscribe();
    this.router.navigate(['/computer']);
  }
}
