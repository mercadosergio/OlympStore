import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = '';
  hide = true;

  public myform!: FormGroup;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.myform = this.formBuilder.group({
    //   email: '',
    //   password: '',
    // });
    this.cargarFormulario();

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

  cargarFormulario() {
    this.myform = this.formBuilder.group({
      email: ['', [Validators.required], [Validators.email]],
      password: ['', [Validators.required], [Validators.minLength(8)]],
    });
  }

  login() {
    this.authService.loginAndGet(this.myform.get('email')?.value, this.myform.get('password')?.value)
      .subscribe();
    console.log(this.myform.get('email')?.value);
    console.log(this.myform.get('password')?.value);
  }
}
