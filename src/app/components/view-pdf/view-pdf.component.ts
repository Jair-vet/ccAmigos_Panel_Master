import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SongService } from 'src/app/services/song.service';

import { SharedComponentModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss'],
  standalone: true,

  imports: [SharedComponentModule, CommonModule],
})
export class ViewPDFComponent implements OnInit {
  loading: boolean = true;
  data: string = '';
  constructor(
    private _myRef: MatDialogRef<ViewPDFComponent>,
    private _songService: SongService,
    @Inject(MAT_DIALOG_DATA) public path_pdf: string
  ) {}

  closeDialog() {
    this._myRef.close();
  }
  loadData() {
    this._songService.getPDFSong(this.path_pdf).subscribe({
      next: (resp) => {
        console.log(resp);
        this.data = resp;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.loadData();
  }
}
