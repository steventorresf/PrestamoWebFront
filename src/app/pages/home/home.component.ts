import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AuthApiService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  arrayMenu = [
    { name: 'Inicio', icon: 'home', url: '/' },
    { name: 'Gestion', icon: 'person', url: '/gestion' },
    { name: 'productos', icon: 'free_breakfast', url: '' },
    { name: 'Ventas', icon: 'collections_bookmark', url: '' },
  ]

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _observer: BreakpointObserver,
    private _authService: AuthApiService,
    private _router: Router
  ) { }

  ngAfterViewInit() {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  clickItemMenu(item: any) {
    this._router.navigate([item.url])
      .then(() => {
        window.location.reload();
      });
  }

  cerrarSesion() {
    this._authService.logout();
  }
}
