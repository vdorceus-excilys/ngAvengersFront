import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';

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

  constructor() { 
    // Create 100 users
    const computerList = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(computerList);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): ComputerDTO{
  let myComputer = {
    id: id,
    name: "name="+id.toString(),
    introduced: "01-01-2019",
    discontinued: "01-01-2019",
    company: "DELL"
  } ;
  console.log(myComputer);
  return myComputer;
}
