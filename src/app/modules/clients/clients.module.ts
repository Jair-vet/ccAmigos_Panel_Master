import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ClientsRoutingModule } from './clients.routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalComponentRegister } from './modal-register/modal.component';


@NgModule({
  imports: [
    ClientsRoutingModule, 
    CommonModule, 
    SharedComponentModule, 
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ListClientsComponent, ModalComponentRegister],
})
export class ClientModule {}

