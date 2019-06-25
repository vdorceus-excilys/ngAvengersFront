import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/user.service';

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
  displayColumns: string[] = ['id', 'username', 'enabled', 'role'];
  dataSource: MatTableDataSource<UserDTO>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.refresh(data));
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

}
