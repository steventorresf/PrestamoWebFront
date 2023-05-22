import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoanApiService } from 'src/app/services/apis/loan.service';
import { PAGINATOR } from 'src/app/utilities/parameters';

@Component({
  selector: 'app-table-loan',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableLoanComponent implements OnInit, OnChanges {

  @Input() clienteId: number = 0;
  @Input() iCallTable: number = 0;
  //@Output() editCliente = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['opciones', 'fechaPrestamo', 'valorPrestamo', 'porcentaje', 'dias', 'noCuotas', 'valorTotal', 'nomPeriodo', 'nomEstado']
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _loanApiService: LoanApiService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getDataSource(this.opPag.pageIndex, this.opPag.pageSize);
  }

  ngOnChanges(changes: any): void {
    if (changes.iCallTable) {
      this.getDataSource(this.opPag.pageIndex, this.opPag.pageSize);
    }
  }

  getDataSource(pageNumber: number, pageSize: number) {
    if(!(this.clienteId > 0))
      return;
    
    this._loanApiService.getPrestamosByClienteId(this.clienteId, pageNumber + 1, pageSize).subscribe(resp => {
      this.opPag.totalItems = resp.data.countItems;
      this.paginator.length = resp.data.countItems;

      this.dataSource = new MatTableDataSource(resp.data.listItems);
      if (pageNumber == 0) {
        this.paginator.firstPage();
      }
    })
  }

  sortData(sortData: Sort) {
    if (sortData.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortData.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  pageChanged(event: PageEvent) {
    this.getDataSource(event.pageIndex, event.pageSize);
  }

  seeCliente(element: any) {
    //this.editCliente.emit(element);
  }
}
