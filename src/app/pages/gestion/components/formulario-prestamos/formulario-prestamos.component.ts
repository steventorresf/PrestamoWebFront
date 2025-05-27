import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamoApiService } from 'src/app/services/apis/prestamo.service';
import { TablaDetalleApiService } from 'src/app/services/apis/tablaDetalle.service';
import { PonerPuntos } from 'src/app/utilities/Metodos';

@Component({
  selector: 'app-formulario-prestamos',
  templateUrl: './formulario-prestamos.component.html'
})
export class FormularioPrestamosComponent implements OnInit {

  Id = 0;
  codigosTablas: string = '3';
  listaPeriodos: any[] = [];
  ResultadoCuotas: any = { listadoCuotas: [] };

  modoCalculo = true;
  modoCreacion = false;

  PonerPuntos = PonerPuntos;

  myForm: FormGroup = this._formBuilder.group({
    valorPrestamo: [null, Validators.required],
    porcentaje: [null, Validators.required],
    dias: [null, Validators.required],
    valorTotal: [{ value: null, disabled: true }, Validators.required],
    periodoId: [null, Validators.required],
    noCuotas: [null, Validators.required],
    fechaPrestamo: [null, Validators.required],
    fechaInicio: [null, Validators.required],
  })

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<FormularioPrestamosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _prestamoApiService: PrestamoApiService,
    private _tablaDetalleApiService: TablaDetalleApiService,
  ) {
    this.dateAdapter.setLocale('es-CO');
  }

  ngOnInit() {
    this.Id = this.data.id;
    if (this.data.id > 0 && this.data.element) {
      const element = this.data.element;
      this.myForm.patchValue({
        tipoId: element.tipoId,
        identificacion: element.identificacion,
        nombreCompleto: element.nombreCompleto,
        generoId: element.generoId,
        telCel: element.telCel,
        direccion: element.direccion,
      })
    }
    this.getTablasDetallePorCodigos();
  }

  getTablasDetallePorCodigos() {
    this._tablaDetalleApiService.getTablasDetallePorCodigos(this.codigosTablas).subscribe(resp => {
      const data = resp.data;
      data.forEach((element: any) => {
        if (element.tablaId === 3) {
          this.listaPeriodos = element.listado;
        }
      });
    })
  }

  establecerValorTotal() {
    var vp = parseFloat(this.myForm.get('valorPrestamo')?.value.split('.').join(''));
    var pc = parseFloat(this.myForm.get('porcentaje')?.value.split('.').join(''));
    var di = parseFloat(this.myForm.get('dias')?.value.split('.').join(''));

    if (!isNaN(vp) && !isNaN(pc) && !isNaN(di)) {
      var vt = vp + ((vp * pc / 100) / 30 * di);
      this.myForm.get('valorTotal')?.setValue(this.PonerPuntos(vt));
    }
    else { this.myForm.get('valorTotal')?.setValue(''); }
  }

  calcularCuotas() {
    const payload = {
      fechaInicio: this.myForm.get('fechaInicio')?.value,
      periodoCod: this.listaPeriodos.find(x => x.tablaDetalleId === this.myForm.get('periodoId')?.value).codigo,
      noCuotas: this.myForm.get('noCuotas')?.value,
      valorPrestamo: this.myForm.get('valorPrestamo')?.value.split('.').join(''),
      valorTotal: this.myForm.get('valorTotal')?.value.split('.').join('')
    }

    this._prestamoApiService.CalcularCuotasPrestamo(payload).subscribe(resp => {
      if (resp.success) {
        this.myForm.disable();
        this.modoCalculo = false;
        this.ResultadoCuotas = resp.data;
        this.modoCreacion = true;
      }
    })
  }

  crearPrestamo() {
    const payload = {
      clienteId: this.data.clienteId,
      valorPrestamo: this.myForm.get('valorPrestamo')?.value.split('.').join(''),
      porcentaje: this.myForm.get('porcentaje')?.value.split('.').join(''),
      dias: this.myForm.get('dias')?.value.split('.').join(''),
      valorTotal: this.myForm.get('valorTotal')?.value.split('.').join(''),
      fechaPrestamo: this.myForm.get('fechaPrestamo')?.value,
      fechaInicio: this.myForm.get('fechaInicio')?.value,
      noCuotas: this.myForm.get('noCuotas')?.value,
      periodoId: this.myForm.get('periodoId')?.value,
      prestamoDetalle: this.ResultadoCuotas.listadoCuotas.map((item: any) => {
        return {
          capital: item.capital,
          intereses: item.intereses,
          fechaCuota: item.fechaCuota
        };
      })
    };

    this._prestamoApiService.CrearPrestamo(payload).subscribe(resp => {
      if (resp.success) {
        this._dialogRef.close({ refresh: true });
      }
    })
  }

  cancelarPrestamo() {
    this.modoCreacion = false;
    this.modoCalculo = true;
    this.ResultadoCuotas = { listadoCuotas: [] };
    this.myForm.enable();
    this.myForm.get('valorTotal')?.disable();
  }

  close() {
    this._dialogRef.close();
  }

}
