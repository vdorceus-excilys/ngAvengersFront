import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';
import { ComputerService } from '../computer.service';

export interface ComputerDTO {
  id: number;
  name: string;
  introduced: string;
  discontinued: string;
  company: string   
}

@Component({
  selector: 'app-list-computer',
  templateUrl: './list-computer.component.html',
  styleUrls: ['./list-computer.component.scss']
})

/**
 * @title Data table with sorting, pagination, and filtering.
 */

export class ListComputerComponent implements OnInit {

  displayedColumns: string[] = ["id","name","introduced","discontinued","company"];
  dataSource: MatTableDataSource<ComputerDTO>;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private computerService: ComputerService,private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.computerService.getComputers().subscribe(data => this.refresh(data));
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  refresh(data){
    const dataDTO = data.map(computer => {
      return {
        id: computer.id, name: computer.name, introduced: computer.introduced, 
        discontinued: computer.discontinued, company: computer.companyName
      };
    });
    this.dataSource = new MatTableDataSource(dataDTO);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetector.detectChanges();
  }

}

