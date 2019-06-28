import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
