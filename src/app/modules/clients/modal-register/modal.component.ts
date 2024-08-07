import { ClientService } from 'src/app/services/client.sevice';
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Events } from 'src/app/models/event.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponentRegister implements OnInit {
  clients: Client[] = [];
  events: Events[] = [];
  eventId = 0
  id_pago: number = 0;
  loading: boolean = false;
  hide = true;
  form: FormGroup;
  isAdmin: boolean = false;
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  dataSourceEvent: MatTableDataSource<Events> = new MatTableDataSource<Events>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponentRegister>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      id: number;
      imageUrl: string;  
      nombre: string;
      id_pago: number;
    }
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      id_project: ['', Validators.required], // Default disabled
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDataEvent();
  }

  isLoggedIn(): boolean {
    // Aquí iría la lógica para verificar si el usuario está logueado
    // Puede ser una verificación de token, una variable en el local storage, etc.
    return !!localStorage.getItem('token');
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const { name, email, password, id_project } = this.form.value;
    console.log(name, email, password, id_project);
  

    this._authService.register(name, email, password, id_project).subscribe({
      next: () => {
        Swal.fire({
          title: 'EXITOSO',
          text: 'Registro Exitoso',
          icon: 'success',
          confirmButtonColor: '#72cc3f',
          heightAuto: false,
        }).then(() => {
          this.close();
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


  loadData(): void {
    this.loading = true;
    this._clientService.getClientes().subscribe({
      next: (resp) => {
        this.clients = [...resp];
        this.dataSource.data = this.clients;
        this.dataSource.sort = this.sort; // Configura el sort después de inicializar dataSource
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  loadDataEvent(): void {
    this.loading = true;
    this._clientService.getAllEvents().subscribe({
      next: (resp) => {
        if (Array.isArray(resp)) {
          this.events = [...resp];
          // console.log(this.events);
          
          this.dataSourceEvent.data = this.events;
          this.dataSourceEvent.sort = this.sort; // Configura el sort después de inicializar dataSource
        } else {
          console.error('La respuesta no es un array:', resp);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
