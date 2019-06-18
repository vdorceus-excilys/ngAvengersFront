import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';

export interface CompanyDTO {
  id: string;
  name: string;
}

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})

/**
 * @title Data table with sorting, pagination, and filtering.
 */

export class ListCompanyComponent implements OnInit {

  displayedColumns: string[] = ["id","name"];
  dataSource: MatTableDataSource<CompanyDTO>;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { 
    // Create 100 users
    const companyList = Array.from({length: 100}, (_, k) => createCompany(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(companyList);
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
function createCompany(id: number): CompanyDTO{
  let myCompany = {
    id: id.toString(),
    name: "name="+id.toString()
  } ;
  console.log(myCompany);
  return myCompany;
}
