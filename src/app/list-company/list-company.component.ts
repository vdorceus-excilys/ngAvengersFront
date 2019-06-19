import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';
import { CompanyService } from '../company.service';

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

  constructor(private companyService: CompanyService,private changeDetector: ChangeDetectorRef) {     
    
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(
      data => {
        console.log(data);
        this.refresh(data);
      }
    )
  }

  refresh(data){
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.changeDetector.detectChanges();
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
