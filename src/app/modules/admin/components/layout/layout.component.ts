import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faEye, faGrip } from '@fortawesome/free-solid-svg-icons';
import { initDropdowns, initAccordions } from 'flowbite';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  profile: User | null = null;
  faEye = faEye;
  faGrip = faGrip;
  faBars = faBars;

  user$ = this.authService.user$;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    initDropdowns();
    initAccordions();
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
