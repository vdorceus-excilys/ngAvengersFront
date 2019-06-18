import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../app/computer.service';
import { ComputerModel } from './computer-model';
import { CompanyModel } from './company-model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit{

  title = 'ngFront';

  computers: ComputerModel[] = [];
  computer: ComputerModel;
  id = 0;

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.getComputers();
    this.getComputer(this.id);
  }
  getComputers(): void {
    this.computerService.getComputers()
    .subscribe(computers => this.computers = computers);
  }

  getComputer(id: number): void {
    this.computerService.getComputer(id)
    .subscribe(computer => this.computer = computer);
  }
  add(name: string, introduced: string, discontinued: string, companyId: number, companyName: string): void {
    name = name.trim();
    if (!name) { return; }
    const computer: ComputerModel = {
      id: null,
      name: name, 
      introduced: introduced, 
      discontinued : discontinued, 
      company:{
        id : companyId, 
        name : companyName} 
      };

    this.computerService.addComputer(computer)
      .subscribe(retourString => {computer.id=retourString.name;});
  }
}
