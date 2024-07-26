import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [AuthRoutingModule, CommonModule, SharedComponentModule],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}
