import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        data: { breadcrumb: 'Clients' },
        component: ListClientsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
