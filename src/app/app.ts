import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private authService: AuthService, private router: Router) {}

  getCurrentUser() {
    return this.authService.getCurrentUserValue();
  }

  isHrAdmin(): boolean {
    return this.authService.isHrAdmin();
  }

  isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}