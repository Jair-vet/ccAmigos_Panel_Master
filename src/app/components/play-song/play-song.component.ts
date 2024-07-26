import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.scss'],
  standalone: true,
  imports: [SharedComponentModule, CommonModule],
})
export class PlaySongComponent {
  @ViewChild('progress') progress!: ElementRef<HTMLInputElement>;
  @ViewChild('song') song!: ElementRef<HTMLAudioElement>;
  @ViewChild('control') control!: ElementRef<HTMLElement>;
  @Input() path_song: string = '';
  @Input() name: string = '';
  @Output() changeSongEvent = new EventEmitter<number>(); //1:previuos, 2:next
  isPlaying: boolean = false;
  constructor(private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.updateProgressBar();
    if (this.path_song !== '') {
      this.playNewSong();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['path_song'] && !changes['path_song'].firstChange) {
      this.playNewSong();
    }
  }
  updateProgressBar() {
    console.log(this.path_song, 'BARRA');
    this.song.nativeElement.addEventListener('timeupdate', () => {
      if (this.path_song !== '') {
        this.progress.nativeElement.max =
          this.song.nativeElement.duration.toString();
        this.progress.nativeElement.value =
          this.song.nativeElement.currentTime.toString();
        if (this.song.nativeElement.ended) {
          this.nextSong();
        }
      }
    });
  }
  playNewSong() {
    if (this.path_song !== '') {
      if (this.song) {
        this.song.nativeElement.src = this.path_song; // Actualizar la fuente de audio
        this.song.nativeElement.load(); // Cargar la nueva canción
        this.playPause(true);
      }
    }
  }
  playPause(playing: boolean) {
    if (this.path_song !== '') {
      if (playing) {
        this.isPlaying = playing;
      } else {
        this.isPlaying = !this.isPlaying;
      }
      if (this.isPlaying) {
        this.song.nativeElement.play();
      } else {
        this.song.nativeElement.pause();
      }
      this.cdRef.detectChanges();
    }
  }
  onProgressChange(): void {
    if (this.path_song != '') {
      this.song.nativeElement.currentTime =
        this.progress.nativeElement.valueAsNumber;
      console.log(this.song.nativeElement.currentTime);
    }
  }

  previuosSong() {
    this.changeSongEvent.emit(1);
  }

  nextSong() {
    this.changeSongEvent.emit(2);
  }
}
