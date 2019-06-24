import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyDTO } from '../list-company/list-company.component';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.scss']
})
export class DeleteCompanyComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCompanyComponent>) { }

  cancel(): void {
    this.dialogRef.close();
  }

}
