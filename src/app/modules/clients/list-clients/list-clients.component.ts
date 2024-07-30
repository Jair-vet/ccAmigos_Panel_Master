import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.sevice';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Instrument } from 'src/app/models/instrument.models';
import { ModalComponent } from '../modal-payment/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})

export class ListClientsComponent {
  paymentId?: number;
  instrumentList: Instrument[] = []
  loading: boolean = true;
  colBig: number = 12;
  colMedium: number = 12;
  colSmall: number = 12;
  totalPayment: number = 0;
  id_pago: number = 0;
  modalWidth: string = '100%';
  clients: Client[] = [];
  displayedColumns: string[] = ['box', 'name', 'edad', 'iglesia', 'email', 'telefono', 'instrumento', 'fecha_registro', 'ruta_pago', 'acciones', 'status'];
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dataSource!: MatTableDataSource<Client>;

  isAllSelected = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _clientService: ClientService,
    public dialog: MatDialog,
    private http: HttpClient,
    private _router: Router,
    private spinner: NgxSpinnerService
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

  exportToExcel() {
    this.spinner.show();
    // Create a new array including the total payment column
    const dataToExport = this.dataSource.data.map(client => ({
      ...client,
      total_pago: client.id_pago === 2 ? 300 : 0
    }));
    // Calculate the total payment sum
    const totalSum = dataToExport.reduce((sum, client) => sum + (client.id_pago === 2 ? 300 : 0), 0);
    // Create a worksheet from the data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    // Append the total sum at the end
    XLSX.utils.sheet_add_aoa(worksheet, [['', 'TOTAL_PAGO', totalSum, '', '', '', '', '', '', '', '']], { origin: -1 });
    // Create a workbook
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // Generate the Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Save the file
    this.saveAsExcelFile(excelBuffer, 'clients');
    this.spinner.hide();
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  selectAll(event: any) {
    this.isAllSelected = event.target.checked;
    this.dataSource.data.forEach(user => user.selected = this.isAllSelected);
    this.calculateTotalPayment();
  }

  checkIfAllSelected() {
    this.isAllSelected = this.dataSource.data.every(user => user.selected);
    this.calculateTotalPayment();
  }

  clearSelection() {
    this.dataSource.data.forEach(user => user.selected = false);
    this.isAllSelected = false;
    this.calculateTotalPayment();
  }
  
  calculateTotalPayment() {
    this.totalPayment = this.dataSource.data
      .filter(client => client.id_pago === 2)
      .reduce((sum, client) => sum + 300, 0);
  }

  updateStatus(client: Client) {

    const ids = this.dataSource.data
      .filter(client => client.selected)  // Filtra los usuarios seleccionados
      .map(user => user.id);          // Extrae solo los IDs

    console.log(ids);
    if (ids.length > 0) {
      Swal.fire({
        title: 'Confirmación',
        text: `¿Estás seguro de que quieres actualizar el estado de los usuarios seleccionados?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();  // Mostrar el spinner
          this.http.put('http://localhost:4002/api/register/estatus/pay/all', { ids: ids })
          .subscribe(response => {
            this.spinner.hide();  // Ocultar el spinner
            Swal.fire(
              'Actualizado',
              `Los estados de los usuarios seleccionados han sido actualizados.`,
              'success'
            );
            this.clearSelection();  // Limpiar selección
          }, error => {
            this.spinner.hide();  // Ocultar el spinner
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el estado.',
              'error'
            );
          });
        }
      });
    } else {
      Swal.fire(
        'Sin selección',
        'No hay usuarios seleccionados para actualizar.',
        'info'
      );
    }
  }


  updateAllStatus() {
    const selectedUsers = this.dataSource.data.filter(client => client.selected);
    selectedUsers.forEach(client => this.updateStatus(client));
  }

  // updateAllPaymentId() {
  //   let id_cliente = cliente.id
  //   const selectedUsers = this.dataSource.data.filter(user => user.selected);
  //   selectedUsers.forEach(user => this.updatePaymentId(Client.id));
  // }

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

  openModal(cliente: Client) {
    // console.log(cliente);
    
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',  // Ancho del modal
      height: '400px',  // Alto del modal
      data: { 
        imageUrl:  cliente.ruta_pago,
        nombre: cliente.nombre,
        id: cliente.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  ngOnInit() {
    this.loadData();
    // this.calculateTotalPayment();
  }
}


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';