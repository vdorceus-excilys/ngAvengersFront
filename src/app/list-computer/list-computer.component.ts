import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComputerService } from '../computer.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComputerComponent } from '../delete-computer/delete-computer.component';
import { CreateComputerComponent } from '../create-computer/create-computer.component';
import { UpdateComputerComponent } from '../update-computer/update-computer.component';
import { ComputerDTOModel } from '../computerDTO-model';
import { TranslateService } from '@ngx-translate/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
  computer: ComputerDTO;

  constructor(private computerService: ComputerService,
              private changeDetector: ChangeDetectorRef,
              private translate: TranslateService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.computerService.getComputers().subscribe(data => this.init(data));
    this.paginator._intl.itemsPerPageLabel = 'N/P: ';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  init(data) {
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

  refresh(data) {
    const dataDTO = data.map(computer => {
      return {
        id: computer.id,
        name: computer.name,
        introduced: computer.introduced,
        discontinued: computer.discontinued,
        company: computer.company
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

  deleteDialog(row: ComputerDTO): void {
    const dialogRef = this.dialog.open(DeleteComputerComponent, {
      height: '35%',
      width: '35%',
      minWidth: '400px',
      minHeight: '180px'
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
      height: '50%',
      width: '35%',
      minWidth: '400px',
      minHeight: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.computerService.getComputers().subscribe(data => this.init(data));
      this.dataSource.paginator.lastPage();
    });
  }

  editDialog(row: any) {
    const dialogRef = this.dialog.open(UpdateComputerComponent, {
      height: '35%',
      width: '50%',
      minWidth: '400px',
      minHeight: '400px',
      data: {
        id: row.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.computerService.getComputers().subscribe(data => this.init(data));
    });
  }

  edit(computer: ComputerDTO): void {
    const index = this.dataSource.data.indexOf(computer);
    if (index > -1) {
      this.computerService.getComputerModel(computer.id).subscribe(computerDTO => {
        this.computer = this.map(computerDTO);
        this.dataSource.data[index] = this.computer;
        this.refresh(this.dataSource.data);
        this.computer = null;
      } );


    }
  }

  map(computer: ComputerDTOModel): ComputerDTO {
    return {
      id: computer.id,
      name: computer.name,
      introduced: computer.introduced,
      discontinued: computer.discontinued,
      company: computer.companyName
    };
  }

}

