import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ToolsService } from 'src/app/services/tools.service';

import { SharedComponentModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss'],
  standalone: true,
  providers: [ToolsService],
  imports: [SharedComponentModule, CommonModule],
})
export class ViewVideoComponent implements OnInit {
  loading: boolean = true;
  title: string = '';
  src: SafeResourceUrl | null = null;
  embeddedVideoHtml!: SafeHtml;
  constructor(
    private _myRef: MatDialogRef<ViewVideoComponent>,
    private _toolsService: ToolsService,
    private _sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public path_video: string
  ) {}

  closeDialog() {
    this._myRef.close();
  }

  generateURL() {
    this._toolsService.getVideoYoutube(this.path_video).subscribe({
      next: (resp) => {
        console.log(resp);
        const iframe = document.createElement('div');
        iframe.innerHTML = resp.html;
        this.title = resp.title;
        const src = iframe.querySelector('iframe')!.getAttribute('src');
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(src || '');
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
    this.generateURL();
  }
}
