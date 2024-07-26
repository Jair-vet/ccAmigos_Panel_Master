import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.sevice';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  clients: Client[] = [];
  loading: boolean = true;
  id_pago: number = 0;
  displayedColumns: string[] = ['box', 'acciones'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _clientService: ClientService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      id: number;
      imageUrl: string;  
      nombre: string;
      id_pago: number;
    }
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeStatusPay(id_pago: number): void {
    console.log(`Cambiando estatus a ${id_pago} para el cliente con id ${this.data.id}`);

    Swal.fire({
      title: 'Cambiar Estatus Pago',
      text: '¿Está seguro de cambiar el estatus del pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#58B1F7',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._clientService.changeStatusPay(this.data.id, id_pago).subscribe({
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

  loadData(): void {
    this.loading = true;
    this._clientService.getClientes().subscribe({
      next: (resp) => {
        this.clients = [...resp];
        this.dataSource.data = this.clients;
        this.dataSource.sort = this.sort; // Configura el sort después de inicializar dataSource
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
