export class Song {
  constructor(
    public id: number,
    public name: string,
    public author: string,
    public music_note: string,
    public path_song: string,
    public path_video: string,
    public path_pdf: string,
    public id_status: boolean
  ) {}
}
