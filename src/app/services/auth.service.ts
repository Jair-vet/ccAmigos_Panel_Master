import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User;
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get path(): string {
    return 'auth';
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/auth/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          // console.log(resp);
          const {
            id,
            name,
            email,
            id_rol
          } = resp.data;
          // console.log(
          //   id,
          //   name,
          //   email,
          //   id_rol
          // );
          this.user = new User(
            id,
            name,
            email,
            id_rol
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),

        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return of(false);
        })
      );
  }
  login(email: string, password: string) {
    return this.http.post(`${base_url}/auth/login`, { password, email }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  // http://localhost:4002/api/users
  // http://localhost:4002/api/auth/register
  register(name: string, email: string, password: string){
    const url = `${base_url}/auth/register`;
    return this.http.post(url, { name, email, password },
        this.headers
      ).pipe(map((resp: any) => resp.message));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
