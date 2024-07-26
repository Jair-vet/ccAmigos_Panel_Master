import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private http: HttpClient) {}

  getVideoYoutube(path_video: string) {
    const id_video = path_video.split('=')[1];
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id_video}&format=json`;
    return this.http.get<any>(url).pipe(map((resp: any) => resp));
  }
}
