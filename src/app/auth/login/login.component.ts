import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  public myform!: FormGroup<IFormLogin>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm() {
    this.myform = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.myform.valid) {
      this.status = 'loading';
      this.authService.loginAndGet(this.User.email, this.User.password)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/home']);
          },
          error: () => {
            this.status = 'failed';
          }
        });
    } else {
      this.myform.markAsUntouched();
    }
  }

  get User(): ILogin {
    return {
      email: this.myform.controls.email.value,
      password: this.myform.controls.password.value,
    }
  }
}
