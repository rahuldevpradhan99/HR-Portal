import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  employeeId: string = "";
  password: string = "";
  errorMessage: string = "";
  showDemoCredentials: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login() {
    this.errorMessage = "";
    
    if (!this.employeeId || !this.password) {
      this.errorMessage = "Please enter both Employee ID and Password";
      return;
    }
    
    // Authenticate user
    if (this.authService.login(this.employeeId, this.password)) {
      const currentUser = this.authService.getCurrentUserValue();
      
      if (currentUser?.role === 'hr-admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.errorMessage = "Invalid credentials. Please try again.";
    }
  }

  toggleDemoCredentials() {
    this.showDemoCredentials = !this.showDemoCredentials;
  }

  fillDemoCredentials(role: 'hr-admin' | 'employee') {
    if (role === 'hr-admin') {
      this.employeeId = 'HR001';
      this.password = 'admin123';
    } else {
      this.employeeId = 'EMP001';
      this.password = 'emp123';
    }
  }
}
