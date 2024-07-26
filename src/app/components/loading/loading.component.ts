import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SharedComponentModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
