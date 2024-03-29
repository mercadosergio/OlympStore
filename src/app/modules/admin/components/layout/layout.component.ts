import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { faBars, faEye, faGrip } from '@fortawesome/free-solid-svg-icons';
import { initDropdowns, initAccordions } from 'flowbite';
import { User } from 'src/app/models/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    animations: [
        trigger('opacityScale', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(.95)' }),
                animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' })),
            ]),
        ]),
    ],
    standalone: true,
    imports: [RouterLink, NgIf, FontAwesomeModule, RouterOutlet, AsyncPipe]
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  isProfileDropdown = false;
  faEye = faEye;
  faGrip = faGrip;
  faBars = faBars;

  user$ = this.authService.user$;

  ngOnInit(): void {
    initDropdowns();
    initAccordions();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isProfileDropdown = !this.isProfileDropdown;
  }
}
