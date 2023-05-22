import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custloanomer',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  clienteId: number = 0;
  elementClient: any;
  iCallTable: number = 0;

  constructor(
    private _dialogRef: MatDialogRef<LoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.clienteId = this.data.clienteId;
    this.elementClient = this.data.element;
  }

  close() {
    this._dialogRef.close();
  }

}
