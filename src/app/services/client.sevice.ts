import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  showModal = false;
  constructor(private http: HttpClient) {}
//   get token(): string {
//     return (
//       //   localStorage.getItem('token') ||
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MTA0NTMyMDd9.akChWRH5CDdeNZYwOj_F_EOxBIhrcqHPXxlLsvEDXEA'
//     );
//   }
  get path(): string {
    return 'register';
  }
  get headers() {
    return {
      headers: {
        // 'x-token': this.token,
      },
    };
  }


  changeStatus(id_cliente: number) {
    const url = `${base_url}/${this.path}/estatus/${id_cliente}`;
    return this.http
      .put(url, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  // http://localhost:4002/api/register/estatus/pay/1
  changeStatusPay(id_cliente: number, id_pago: number) {
    const url = `${base_url}/${this.path}/estatus/pay/${id_cliente}`;
    // console.log(id_cliente, id_pago);
    return this.http
      .put(url, { id_pago }, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  // ForAll
  // http://localhost:4002/api/register/estatus/pay/all
  changeStatusPayAll(id_cliente: number, ids: number[]) {
    const url = `${base_url}/${this.path}/estatus/pay/all${id_cliente}`;
    return this.http
      .put(url, { ids })
      .pipe(map((resp: any) => resp.message));
  }

  getClientes() {
    const url = `${base_url}/${this.path}`;
    return this.http
      .get<Client[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
}
