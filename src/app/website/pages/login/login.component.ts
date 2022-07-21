import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService, 
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  createUser() {
    this.userService.create({
      name: 'Sergio',
      email: 'sergio@mail.com',
      password: '1234',
    })
      .subscribe(rta => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('sergio@mail.com', '1234')
      .subscribe(rta => {
        console.log(rta.access_token);
      });
  }
}
