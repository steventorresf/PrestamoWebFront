import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteApiService } from 'src/app/services/apis/cliente.service';
import { PAGINATOR } from 'src/app/utilities/parameters';

@Component({
  selector: 'app-table-client',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableClientComponent implements OnInit, OnChanges {

  @Input() textFilter: string = '';
  @Input() iCallTable: number = 0;
  @Output() editCliente = new EventEmitter<any>();
  @Output() managePrestamos = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['opciones', 'identificacion', 'nombreCompleto', 'genero', 'telefono', 'direccion']
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _clienteApiService: ClienteApiService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: any): void {
    if (changes.textFilter || changes.iCallTable) {
      this.getDataSource(this.opPag.pageIndex, this.opPag.pageSize);
    }
  }

  getDataSource(pageNumber: number, pageSize: number) {
    this._clienteApiService.obtenerClientesActivosporUsuario().subscribe(resp => {
      // this.opPag.totalItems = resp.data.countItems;
      // this.paginator.length = resp.data.countItems;

      // this.dataSource = new MatTableDataSource(resp.data.listItems);
      // if (pageNumber == 0) {
      //   this.paginator.firstPage();
      // }
      this.dataSource = new MatTableDataSource(resp.data);
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
    this.editCliente.emit(element);
  }

  seePrestamos(element: any) {
    this.managePrestamos.emit(element);
  }
}
