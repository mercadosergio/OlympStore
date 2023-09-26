import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/utils/validators';
import { RequestStatus } from 'src/app/models/types/request-status.model';
import { AuthService } from 'src/app/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IFormRegister } from 'src/app/models/interfaces/register.model';

interface UserRole {
  name: string;
  role: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  hide: boolean = true;
  hideConfirm: boolean = true;
  visibilityIcon: string = '';

  public formRegister!: FormGroup<IFormRegister>;

  public userRole: UserRole[] = [
    {
      name: 'Cliente',
      role: 'customer',
    },
    {
      name: 'Admin',
      role: 'admin',
    },
  ];

  // public mensajeConfirm: string = '';
  // public icono: string = '';

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  showRegisterForm: boolean = false;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  ngOnInit(): void {
    this.loadForm();
    this.visibilityIcon = this.hide ? 'visibility_off' : 'visibility';
  }

  register() {
    if (this.formRegister.valid) {
      this.status = 'loading';
      const { name, email, password } = this.formRegister.getRawValue();
      this.authService.registerAndLogin(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    } else {
      this.formRegister.markAllAsTouched();
    }
    console.log(this.formRegister);
  }
  private loadForm() {
    this.formRegister = this.formBuilder.nonNullable.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        role: 'customer',
      },
      {
        validators: [
          CustomValidators.MatchValidator('password', 'confirmPassword'),
        ],
      }
    );
  }
}
