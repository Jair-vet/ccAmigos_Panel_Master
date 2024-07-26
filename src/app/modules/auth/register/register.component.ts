import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading: boolean = false;
  hide = true;
  form: FormGroup;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuider: FormBuilder
  ) {
    this.form = this._formBuider.group({
      name: ['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToLogin() {
    this._router.navigateByUrl('auth/login');
  }

  register() {
    this.loading = true;
    this._authService
      .register(this.form.value.name, this.form.value.email, this.form.value.password)
      .subscribe({
        complete: () => {
          this._router.navigateByUrl('auth/login');
          this.loading = false;
          success: {
            Swal.fire({
              title: 'EXITOSO',
              text: 'Registo Exitoso',
              icon: 'success',
              confirmButtonColor: '#72cc3f',
              heightAuto: false,
            });
            this.loading = false;
          }
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
