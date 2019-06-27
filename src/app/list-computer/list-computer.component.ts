import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ComputerModel } from '../computer-model';
import { CompanyModel } from '../company-model';
import { filter } from 'minimatch';
import { ComputerService } from '../computer.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComputerComponent } from '../delete-computer/delete-computer.component';
import { CreateComputerComponent } from '../create-computer/create-computer.component';
import { UpdateComputerComponent } from '../update-computer/update-computer.component';

export interface ComputerDTO {
  id: string;
  name: string;
  introduced: string;
  discontinued: string;
  company: string;
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

  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'company', 'actions'];
  dataSource: MatTableDataSource<ComputerDTO>;
  selection = new SelectionModel<ComputerDTO>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private computerService: ComputerService,
              private changeDetector: ChangeDetectorRef,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.computerService.getComputers().subscribe(data => this.refresh(data));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh(data) {
    const dataDTO = data.map(computer => {
      return {
        id: computer.id,
        name: computer.name,
        introduced: computer.introduced,
        discontinued: computer.discontinued,
        company: computer.companyName
      };
    });
    this.dataSource = new MatTableDataSource(dataDTO);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetector.detectChanges();
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
  checkboxLabel(row?: ComputerDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteDialog(row: ComputerDTO): void {
    const dialogRef = this.dialog.open(DeleteComputerComponent, {
      height: '35%',
      width: '35%',
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(row);
        this.refresh(this.dataSource.data);
      }
    });
  }

  delete(computer: ComputerDTO): void {
    const index = this.dataSource.data.indexOf(computer);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.computerService.deleteComputer('' + computer.id).subscribe();
    }
  }

  addDialog(): void {
    const dialogRef = this.dialog.open(CreateComputerComponent, {
      height: '35%',
      width: '35%',
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO call service
      }
    });
  }

  editDialog(row: any) {
    const dialogRef = this.dialog.open(UpdateComputerComponent, {
      height: '35%',
      width: '35%',
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO call service
      }
    });
  }

}

