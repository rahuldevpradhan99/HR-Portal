import { Component } from '@angular/core';
import { Onboarding } from '../../services/onboarding';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  progress = 0;
  points = 0;

  constructor(
    private service: Onboarding, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.progress = service.progress;
    this.points = service.points;
  }

  getCurrentUser() {
    return this.authService.getCurrentUserValue();
  }

  getEmployeeId(): string {
    const currentUser = this.authService.getCurrentUserValue();
    return currentUser?.employeeId || 'Unknown';
  }

  getUserName(): string {
    const currentUser = this.authService.getCurrentUserValue();
    return currentUser?.name || 'Unknown';
  }

  getDepartment(): string {
    const currentUser = this.authService.getCurrentUserValue();
    return currentUser?.department || 'Unknown';
  }

  getCurrentLevel(): number {
    return Math.floor(this.points / 200) + 1;
  }

  logout() {
    this.authService.logout();
    // Navigate to login page will be handled by router guard
  }
}
