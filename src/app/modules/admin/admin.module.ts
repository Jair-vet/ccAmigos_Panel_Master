import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, LayoutComponent, AdminRoutingModule],
})
export class AdminModule {}
