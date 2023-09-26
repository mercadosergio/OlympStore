import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink]
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  user: User | null = null;

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }
}
