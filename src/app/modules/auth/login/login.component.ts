import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  hide = true;
  form: FormGroup;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuider: FormBuilder
  ) {
    this.form = this._formBuider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToRegister() {
    this._router.navigateByUrl('auth/register');
  }

  login() {
    this.loading = true;
    this._authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe({
        complete: () => {
          this._router.navigateByUrl('admin/clients');
          this.loading = false;
        },
        error: (err) => {
          Swal.fire({
            title: 'ERROR',
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#58B1F7',
            heightAuto: false,
          });
          this.loading = false;
        },
      });
  }
}
