import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IFormLogin, ILogin } from 'src/app/models/interfaces/login.model';
import { RequestStatus } from 'src/app/models/types/request-status.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = '';
  hide = true;
  status: RequestStatus = 'init';

  public formLogin!: FormGroup<IFormLogin>;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

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
      this.authService.login(this.formLogin.controls.email.value, this.formLogin.controls.password.value)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.status = 'failed';
            console.log(error);
          }
        });
    } else {
      this.formLogin.markAsUntouched();
    }
  }

  get User(): ILogin {
    return {
      email: this.formLogin.controls.email.value,
      password: this.formLogin.controls.password.value,
    }
  }
}
