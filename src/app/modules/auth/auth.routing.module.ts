import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../../guards/auth.guard'; // Importar AdminGuard

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        data: { breadcrumb: 'Login' },
        component: LoginComponent,
      },
      {
        path: 'register',
        data: { breadcrumb: 'Register' },
        component: RegisterComponent,
        canActivate: [AuthGuard], // Aplicar AuthGuard
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
