import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = '';

  constructor(
    private userService: UsersService) { }

  ngOnInit(): void {
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
}
