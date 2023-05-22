import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanComponent } from '../loans/loan.component';
import { EditorClientComponent } from './components/editor/editor.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  textFilter: string = '';
  iCallTable: number = 0;

  constructor(
    private _matDialog: MatDialog
  ) { }

  ngOnInit() {

  }

  changeFilter(event: any) {
    this.textFilter = event?.target?.value?.toString() || '';
  }

  openEditor(element: any) {
    this._matDialog.open(EditorClientComponent, {
      disableClose: true,
      width: '40%',
      maxHeight: '98%',
      data: { id: element ? element.clienteId : 0, element }
    }).afterClosed().subscribe(data => {
      if (data?.refresh) {
        this.iCallTable++;
      }
    });
  }

  editCliente(element: any) {
    this.openEditor(element);
  }

  managePrestamos(element: any){
    this._matDialog.open(LoanComponent, {
      disableClose: true,
      width: '95%',
      minWidth: '95%',
      maxHeight: '98%',
      data: { clienteId: element ? element.clienteId : 0, element }
    }).afterClosed().subscribe(data => {
      if (data?.refresh) {
        this.iCallTable++;
      }
    });
  }

}
