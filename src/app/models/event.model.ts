import { Song } from './song.model';

export class EventApp {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public address: string,
    public id_status: boolean,
    public songs: Song[]
  ) {}
}
