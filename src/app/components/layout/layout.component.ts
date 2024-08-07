import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Client } from 'src/app/models/client.model';
import { ModalComponentRegister } from 'src/app/modules/clients/modal-register/modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SharedComponentModule, CommonModule, RouterModule],
})
export class LayoutComponent {
  user!: User;
  isAdmin: boolean = false;
  isAdminNumber = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  modalWidth: string = '100%';
  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private _authService: AuthService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.modalWidth = '100%';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.modalWidth = '85%';
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.modalWidth = '65%';
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.modalWidth = '45%';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.modalWidth = '33%';
          }
        }
      });
    this.user = this._authService.user;
    console.log(this._authService.user);
  }
  changeRoute(route: string) {
    this._router.navigateByUrl(route);
  }
  
  navigateToRegister() {
    this._router.navigateByUrl('auth/register');
  }

  openModalRegister(/* cliente: Client */) {
    // console.log(cliente);
    
    const dialogRef = this.dialog.open(ModalComponentRegister, {
      width: '700px',  // Ancho del modal
      height: '550px',  // Alto del modal
      // data: { 
      //   imageUrl:  cliente.ruta_pago,
      //   nombre: cliente.nombre,
      //   id: cliente.id
      // }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  
  
  ngOnInit(): void {
    const userRole = this._authService.user.id_rol;
    this.isAdmin = userRole === 1;

    console.log(this.isAdmin);
    console.log(userRole);
    
  }
  
  logout() {
    Swal.fire({
      title: 'Salir',
      text: '¿Esta seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#58B1F7',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.logout();
        this._router.navigateByUrl('auth/login');
      }
    });
  }
}
