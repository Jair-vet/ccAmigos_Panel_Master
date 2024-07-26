import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.sevice';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Client } from 'src/app/models/client.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-payment-status-modal',
  templateUrl: './payment-status-modal.component.html',
  styleUrls: ['./payment-status-modal.component.css']
})
export class PaymentStatusModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
//   @Input() paymentId: number;
  @Output() closeModalEvent = new EventEmitter<void>();
//   imageSrc: string;
    loading: boolean = true;
  colBig: number = 12;
  colMedium: number = 12;
  colSmall: number = 12;
  modalWidth: string = '100%';
  clients: Client[] = [];
  displayedColumns: string[] = ['name', 'edad', 'iglesia', 'email', 'telefono', 'status', 'instrumento', 'ruta_pago', 'fecha_registro'];

  ngOnInit() {
    
  }

  ngOnChanges() {
   
  }
//   loadImage() {
//     const apiUrl = `https://sgp-web.nyc3.cdn.digitaloceanspaces.com/CCAmigos/Clientes/${this.paymentId}`;
//     this.http.get<{ imageUrl: string }>(apiUrl).subscribe(response => {
//       this.imageSrc = response.imageUrl;
//     }, error => {
//       console.error('Error al cargar la imagen:', error);
//     });
//   }

  closeModal() {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }

//   updateStatus(status: string) {
//     const apiUrl = `https://tu-api.com/update-payment-status/${this.paymentId}`;
//     const body = { status: status };
// 
//     this.http.post(apiUrl, body).subscribe(response => {
//       console.log('Estado actualizado:', response);
//       this.closeModal();
//     }, error => {
//       console.error('Error al actualizar el estado:', error);
//     });
//   }
}
