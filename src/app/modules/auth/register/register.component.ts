import { Component } from '@angular/core';
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
  isAdmin: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuider: FormBuilder,
    private router: Router
  ) {
    this.form = this._formBuider.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      projectId: [{ value: '', disabled: true }, Validators.required], // Default disabled
    });
  }
  
  // ngOnInit(): void {
  //   const user = this._authService.getUser();
  //   if (user) {
  //     this.isAdmin = user.id_rol === 1;
  //     if (this.isAdmin) {
  //       this.form.get('projectId')?.enable();
  //     } else {
  //       this.form.get('projectId')?.setValue(user.id_proyecto);
  //     }
  //   } else {
  //     // Manejo en caso de que el usuario no esté disponible
  //     console.error('No se pudo obtener el usuario');
  //     // Puedes redirigir al login o mostrar un mensaje de error
  //     this._router.navigate(['/auth/login']);
  //   }
  // }

  navigateToAdminClients(): void {
    this.router.navigate(['/admin/clients']);
  }
  isLoggedIn(): boolean {
    // Aquí iría la lógica para verificar si el usuario está logueado
    // Puede ser una verificación de token, una variable en el local storage, etc.
    return !!localStorage.getItem('token');
  }

  navigateToLogin() {
    this._router.navigateByUrl('auth/login');
  }

  // register() {
  //   this.loading = true;
  //   this._authService
  //     .register(this.form.value.name, this.form.value.email, this.form.value.password)
  //     .subscribe({
  //       complete: () => {
  //         this._router.navigateByUrl('auth/login');
  //         this.loading = false;
  //         success: {
  //           Swal.fire({
  //             title: 'EXITOSO',
  //             text: 'Registo Exitoso',
  //             icon: 'success',
  //             confirmButtonColor: '#72cc3f',
  //             heightAuto: false,
  //           });
  //           this.loading = false;
  //         }
  //       },
  //       error: (err) => {
  //         Swal.fire({
  //           title: 'ERROR',
  //           text: err.error.message,
  //           icon: 'error',
  //           confirmButtonColor: '#58B1F7',
  //           heightAuto: false,
  //         });
  //         this.loading = false;
  //       },
  //     });
  //   }
  // }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const { name, email, password, projectId } = this.form.getRawValue(); // Use getRawValue to get values including disabled fields
    console.log(name, email, password, projectId);
  

    this._authService.register(name, email, password, projectId).subscribe({
      next: () => {
        Swal.fire({
          title: 'EXITOSO',
          text: 'Registro Exitoso',
          icon: 'success',
          confirmButtonColor: '#72cc3f',
          heightAuto: false,
        }).then(() => {
          this.navigateToLogin();
        });
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
      complete: () => {
        this.loading = false;
      },
    });
  }
}