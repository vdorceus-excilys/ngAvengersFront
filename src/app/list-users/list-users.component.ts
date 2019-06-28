import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

export interface UserDTO {
  id: string;
  username: string;
  enabled: string;
  role: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
/**
 * @title User table with sorting, pagination and filtering
 */
export class ListUsersComponent implements OnInit {
  displayColumns: string[] = ['username', 'enabled', 'role', 'actions'];
  dataSource: MatTableDataSource<UserDTO>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private changeDetector: ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.refresh(data));
    this.paginator._intl.itemsPerPageLabel = 'N/P: ';
  }

  refresh(data: any) {
    const dataDTO = data.map(user => {
        return {
          id: user.id,
          username: user.username,
          enabled: (user.enabled) ? 'ENABLED' : 'DISABLED',
          role: (user.role === 'ROLE_ADMIN') ? 'ADMIN' : 'USER'
        } as UserDTO;
    });
    this.dataSource = new MatTableDataSource(dataDTO);
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

  deleteDialog(row: UserDTO): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
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

  delete(user: UserDTO): void {
    const index = this.dataSource.data.indexOf(user);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.userService.deleteUser('' + user.id).subscribe();
    }
  }

}
