import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Credentials } from '../security/security.component';

@Component({
  selector: 'app-delete-computer',
  templateUrl: './delete-computer.component.html',
  styleUrls: ['./delete-computer.component.scss']
})
export class DeleteComputerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComputerComponent>) { }

  cancel(): void {
    this.dialogRef.close();
  }


}
