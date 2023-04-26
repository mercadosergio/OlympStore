import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';
import { CustomValidators } from 'src/app/utils/validators';
import { RequestStatus } from 'src/app/models/types/request-status.model';
import { UsersService } from 'src/app/services/users.service';
import { ModalAlertaComponent } from '../../website/components/modal-alerta/modal-alerta.component';
import { AuthService } from 'src/app/services/auth.service';

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

export class RegisterComponent implements OnInit {
  hide: boolean = true;
  visibilityIcon: string = '';
  // public formRegister!: FormGroup;
  // public formVerifyEmail!: FormGroup;

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

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  showRegisterForm: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  formVerifyEmail = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  formRegister = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    role: 'customer',
  }, {
    validators: [CustomValidators.MatchValidator('password', 'confirmPassword')]
  });

  ngOnInit(): void {
    this.visibilityIcon = (this.hide ? 'visibility_off' : 'visibility');
  }

  register() {
    if (this.formRegister.valid) {
      this.status = 'loading';
      const { name, email, password } = this.formRegister.getRawValue();

      this.authService.registerAndLogin(name, email, password)
        .subscribe({
          next: () => {
            this.status = 'success';
            // this.router.navigate(['/app/'])
          },
          error: (error) => {
            this.status = 'failed';
            console.log(error);
          }
        })
      // this.userService.create(this.formRegister.value)
      //   .subscribe(rta => {
      //     this.mensajeConfirm = 'Registro completado. Bienvenido!';
      //     this.icono = 'check_circle_outline';
      //     this.openDialog();
      //     this.router.navigate(['/login']);
      //   });
    }
  }
  //implements onExit
  // onExit() {
  //   if (this.formRegister.valid) {
  //     return false;
  //   } else {
  //     const rta = confirm('Estás seguro de salir?');
  //     return rta;
  //   }
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAlertaComponent, {
      width: '350px',
      data: { message: this.mensajeConfirm, icon: this.icono },
    });
  }

}
