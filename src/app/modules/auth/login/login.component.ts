import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IFormLogin, ILogin } from 'src/app/models/interfaces/login.model';
import { RequestStatus } from 'src/app/models/types/request-status.model';
import { AuthService } from 'src/app/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [LogoComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule, FontAwesomeModule, RouterLink]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  token = '';
  hide = true;
  status: RequestStatus = 'init';

  public formLogin!: FormGroup<IFormLogin>;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formLogin = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(event: Event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      this.authService
        .login(
          this.formLogin.controls.email.value,
          this.formLogin.controls.password.value
        )
        .subscribe({
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
      this.formLogin.markAsUntouched();
    }
  }

  get User(): ILogin {
    return {
      email: this.formLogin.controls.email.value,
      password: this.formLogin.controls.password.value,
    };
  }
}
