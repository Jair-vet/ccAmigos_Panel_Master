import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Song } from '../models/song.model';
import { Voice } from '../models/voice.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return (
      //   localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MTA0NTMyMDd9.akChWRH5CDdeNZYwOj_F_EOxBIhrcqHPXxlLsvEDXEA'
    );
  }
  get path(): string {
    return 'voices';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  addVoice(type_voice: string, id_song: number, voice: File) {
    const url = `${base_url}/${this.path}/`;
    console.log(url);
    const formData = new FormData();

    formData.append('type_voice', type_voice);
    formData.append('id_song', JSON.stringify(id_song));
    formData.append('voice', voice);

    return this.http
      .post(url, formData, this.headers)
      .pipe(map((resp: any) => resp.message));
  }

  getVoices(id_song: number) {
    const url = `${base_url}/${this.path}/${id_song}`;
    return this.http
      .get<Voice[]>(url, this.headers)
      .pipe(map((resp: any) => resp.data));
  }

  deleteVoice(id_voice: number) {
    const url = `${base_url}/${this.path}/${id_voice}`;
    return this.http
      .delete(url, this.headers)
      .pipe(map((resp: any) => resp.message));
  }
}
