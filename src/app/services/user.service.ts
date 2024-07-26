import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return (
      //   localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MTA0NTMyMDd9.akChWRH5CDdeNZYwOj_F_EOxBIhrcqHPXxlLsvEDXEA'
    );
  }
  get path(): string {
    return 'users';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  addUser(
    name: string,
    email: string,
    password: string,
  ) {
    const url = `${base_url}/${this.path}/`;
    return this.http
      .post(
        url,
        { name, email, password },
        this.headers
      )
      .pipe(map((resp: any) => resp.message));
  }

  changeStatusAccountUser( id_status: number) {
    const url = `${base_url}/${this.path}/status`;
    return this.http
      .put(url, { id_status }, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  updateUser(
    id_user: number,
    id_organization: number,
    name: string,
    photo: File
  ) {
    const url = `${base_url}/${this.path}/${id_user}`;
    const formData = new FormData();
    formData.append('id_organization', JSON.stringify(id_organization));

    formData.append('name', name);

    formData.append('photo', photo);

    return this.http
      .put(url, formData, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  getUsers(id_organization: number) {
    const url = `${base_url}/${this.path}/${id_organization}`;
    return this.http
      .get<User[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
}
