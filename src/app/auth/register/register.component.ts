import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';
import { UsersService } from 'src/app/services/users.service';
import { ModalAlertaComponent } from 'src/app/shared/components/modal-alerta/modal-alerta.component';

export interface DialogData {
  message: string,
  icon: string,
}

interface UserRole {
  name: string;
  role: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnExit {
  hide = true;
  public myform!: FormGroup;

  public userRole: UserRole[] = [
    {
      name: 'Cliente',
      role: 'customer',
    },
    {
      name: 'Admin',
      role: 'admin',
    }
  ];

  public mensajeConfirm: string = '';
  public icono: string = '';

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.validarForm();
    // this.openDialog();
  }


  createUser() {
    this.userService.create({
      name: 'Sergio',
      email: 'sergio@mail.com',
      password: '1234',
      role: 'customer',
    })
      .subscribe(rta => {
        console.log(rta);
      });
  }

  register() {
    this.userService.create({
      name: this.myform.get('name')?.value,
      email: this.myform.get('email')?.value,
      password: this.myform.get('password')?.value,
      role: this.myform.get('role')?.value,
    })
      .subscribe(rta => {
        this.mensajeConfirm = 'Registro completado. Bienvenido!'
        this.icono = 'check_circle_outline';
        this.openDialog();
        this.router.navigate(['/login']);
      });
  }

  validarForm() {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required], [Validators.email]],
      password: ['', [Validators.required], [Validators.minLength(8)]],
      role: '',
    });
  }

  onExit() {
    if (this.myform.valid) {
      return false;
    } else {
      const rta = confirm('Estás seguro de salir?');
      return rta;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAlertaComponent, {
      width: '350px',
      data: { message: this.mensajeConfirm, icon: this.icono },
    });
  }
}
