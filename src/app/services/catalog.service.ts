import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TypeVoice } from 'src/app/models/catalogs/type-voice.model';
import { Rol } from '../models/catalogs/rol.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return (
      //   localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MTA0NTMyMDd9.akChWRH5CDdeNZYwOj_F_EOxBIhrcqHPXxlLsvEDXEA'
    );
  }
  get path(): string {
    return 'catalogs';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getTypeVoices() {
    const url = `${base_url}/${this.path}/types-voices/`;
    return this.http
      .get<TypeVoice[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }

  getRols() {
    const url = `${base_url}/${this.path}/rols/`;
    return this.http
      .get<Rol[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
}
