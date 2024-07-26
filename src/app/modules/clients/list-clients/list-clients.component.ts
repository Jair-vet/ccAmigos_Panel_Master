import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.sevice';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Instrument } from 'src/app/models/instrument.models';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent {
  instrumentList: Instrument[] = []
  loading: boolean = true;
  colBig: number = 12;
  colMedium: number = 12;
  colSmall: number = 12;
  // id_cliente: number = 0;
  id_pago: number = 0;
  modalWidth: string = '100%';
  clients: Client[] = [];
  displayedColumns: string[] = ['box', 'name', 'edad', 'iglesia', 'email', 'telefono', 'status', 'instrumento', 'ruta_pago', 'fecha_registro', 'acciones'];
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dataSource!: MatTableDataSource<Client>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _clientService: ClientService,
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
            this.colBig = 12;
            this.colMedium = 12;
            this.colSmall = 12;

            this.modalWidth = '100%';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.colBig = 12;
            this.colMedium = 12;
            this.colSmall = 6;

            this.modalWidth = '85%';
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.colBig = 12;
            this.colMedium = 4;
            this.colSmall = 4;

            this.modalWidth = '65%';
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.colBig = 6;
            this.colMedium = 4;
            this.colSmall = 2;

            this.modalWidth = '45%';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.colBig = 6;
            this.colMedium = 4;
            this.colSmall = 2;

            this.modalWidth = '33%';
          }
        }
      });
  }

  changeStatusClient(status: boolean, client: Client) {
    console.log(client.id);
    
    Swal.fire({
      title: status ? 'Eliminar' : 'Desactivar',
      text:
        '¿Esta seguro de Eliminar' + ' a ' + client.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#58B1F7',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._clientService
          .changeStatus(client.id)
          .subscribe({
            next: (resp) => {
              Swal.fire({
                title: 'OK',
                text: resp,
                icon: 'success',
                confirmButtonColor: '#58B1F7',
                heightAuto: false,
              });
            },
            complete: () => {
              this.loadData();
            },
            error: (err) => {
              console.log(err);
              Swal.fire({
                title: 'ERROR',
                text: err.error.message,
                icon: 'error',
                confirmButtonColor: '#58B1F7',
                heightAuto: false,
              });
            },
          });
      }
    });
  }

  changeStatusPay(id_pago: Number, cliente: Client) {
    console.log(cliente);
    
    console.log(id_pago, cliente.id);
    let id_cliente = cliente.id

    Swal.fire({
      title: 'Cambiar Estatus Pago',
      text:
        '¿Esta seguro de cambiar el Estatus del Pago' + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#58B1F7',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._clientService
          .changeStatusPay(id_cliente, this.id_pago)
          .subscribe({
            next: (resp) => {
              Swal.fire({
                title: 'OK',
                text: resp,
                icon: 'success',
                confirmButtonColor: '#58B1F7',
                heightAuto: false,
              });
            },
            complete: () => {
              this.loadData();
            },
            error: (err) => {
              console.log(err);
              Swal.fire({
                title: 'ERROR',
                text: err.error.message,
                icon: 'error',
                confirmButtonColor: '#58B1F7',
                heightAuto: false,
              });
            },
          });
      }
    });
  }

  loadData() {
    this.loading = true;
    this._clientService.getClientes().subscribe({
      next: (resp) => {
        this.clients = [...resp];
        // console.log(this.clients);
        this.dataSource = new MatTableDataSource(this.clients);
      },
      complete: () => {
        this.dataSource.sort = this.sort;        
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // console.log(err);
      },
    });
  }


  ngOnInit() {
    this.loadData();
  }
}
