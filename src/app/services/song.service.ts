import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Song } from '../models/song.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return (
      //   localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MTA0NTMyMDd9.akChWRH5CDdeNZYwOj_F_EOxBIhrcqHPXxlLsvEDXEA'
    );
  }
  get path(): string {
    return 'songs';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  addSong(
    id_organization: number,
    name: string,
    author: string,
    music_note: string,
    path_video: string,
    song: File,
    pdf: File
  ) {
    const url = `${base_url}/${this.path}/`;
    const formData = new FormData();
    formData.append('id_organization', JSON.stringify(id_organization));
    formData.append('name', name);
    formData.append('author', author);
    formData.append('music_note', music_note);
    formData.append('song', song);
    formData.append('path_video', path_video);
    formData.append('pdf', pdf);
    return this.http
      .post(url, formData, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  updateSong(
    id_song: number,
    id_organization: number,
    name: string,
    author: string,
    music_note: string,
    path_video: string,
    song: File,
    pdf: File
  ) {
    const url = `${base_url}/${this.path}/`;
    const formData = new FormData();
    formData.append('id_organization', JSON.stringify(id_organization));
    formData.append('id_song', JSON.stringify(id_song));
    formData.append('name', name);
    formData.append('author', author);
    formData.append('music_note', music_note);
    formData.append('song', song);
    formData.append('path_video', path_video);
    formData.append('pdf', pdf);
    return this.http
      .put(url, formData, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  getSongs(id_organization: number) {
    const url = `${base_url}/${this.path}/${id_organization}`;
    return this.http
      .get<Song[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }

  getSong(id_song: number) {
    const url = `${base_url}/${this.path}/detail/${id_song}`;
    return this.http
      .get<Song>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
  getPDFSong(path_pdf: string) {
    const url = `${base_url}/${this.path}/pdf/`;
    return this.http
      .post<any>(url, { path_pdf }, this.headers)
      .pipe(map((resp: any) => resp.data));
  }

  deletSong(id_song: number) {
    const url = `${base_url}/${this.path}/${id_song}`;
    return this.http
      .delete(url, this.headers)
      .pipe(map((resp: any) => resp.message));
  }
}
