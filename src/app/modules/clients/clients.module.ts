import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ClientsRoutingModule } from './clients.routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';



@NgModule({
  imports: [ClientsRoutingModule, CommonModule, SharedComponentModule],
  declarations: [ListClientsComponent],
})
export class ClientModule {}

