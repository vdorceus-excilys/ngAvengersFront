import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';
import { CompanyService } from '../company.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { Router } from '@angular/router';

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

  displayedColumns: string[] = ['select', 'name'];
  dataSource: MatTableDataSource<CompanyDTO>;
  selection = new SelectionModel<CompanyDTO>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<CompanyDTO>;


  constructor(private companyService: CompanyService,
              private changeDetector: ChangeDetectorRef,
              public dialog: MatDialog,
              private router: Router) {
              }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(
      data => { this.refresh(data); }
    );
  }

  refresh(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetector.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CompanyDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteDialog(): void {
    const dialogRef = this.selection.isEmpty() ? null : this.dialog.open(DeleteCompanyComponent, {
      height: '35%',
      width: '35%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selection.selected.forEach(element => {
          this.delete(element);
        });
        this.refresh(this.dataSource.data);
      }
    });
  }

  delete(element: CompanyDTO): void {
    const index = this.dataSource.data.indexOf(element);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.companyService.deleteCompany(element.id).subscribe();
    }
  }

}
