import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
