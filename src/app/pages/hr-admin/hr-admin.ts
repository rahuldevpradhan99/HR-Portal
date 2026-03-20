import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { Onboarding } from '../../services/onboarding';

interface EmployeeStats {
  totalEmployees: number;
  activeOnboarding: number;
  completedOnboarding: number;
  averageProgress: number;
  totalPointsAwarded: number;
}

interface NewUser {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  password: string;
}

@Component({
  selector: 'app-hr-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './hr-admin.html',
  styleUrl: './hr-admin.css',
})
export class HrAdmin {
  employees: User[] = [];
  stats: EmployeeStats;
  showAddUserForm: boolean = false;
  showEditUserForm: boolean = false;
  selectedUser: User | null = null;
  newUser: NewUser = {
    employeeId: '',
    name: '',
    email: '',
    department: '',
    password: ''
  };
  editUserData: NewUser = {
    employeeId: '',
    name: '',
    email: '',
    department: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private onboardingService: Onboarding
  ) {
    this.employees = this.authService.getAllUsers();
    this.stats = this.calculateStats();
  }

  private calculateStats(): EmployeeStats {
    const totalEmployees = this.employees.length;
    const completedOnboarding = Math.floor(totalEmployees * 0.6); // Simulated
    const activeOnboarding = totalEmployees - completedOnboarding;
    const averageProgress = Math.floor((completedOnboarding / totalEmployees) * 100);
    const totalPointsAwarded = completedOnboarding * 250; // Simulated

    return {
      totalEmployees,
      activeOnboarding,
      completedOnboarding,
      averageProgress,
      totalPointsAwarded
    };
  }

  getCurrentUser() {
    return this.authService.getCurrentUserValue();
  }

  logout() {
    this.authService.logout();
  }

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
    this.showEditUserForm = false;
    this.resetNewUserForm();
  }

  resetNewUserForm() {
    this.newUser = {
      employeeId: '',
      name: '',
      email: '',
      department: '',
      password: ''
    };
  }

  addUser() {
    if (!this.newUser.employeeId || !this.newUser.name || !this.newUser.email || 
        !this.newUser.department || !this.newUser.password) {
      alert('Please fill in all fields');
      return;
    }

    const success = this.authService.addUser({
      ...this.newUser,
      role: 'employee'
    });

    if (success) {
      this.employees = this.authService.getAllUsers();
      this.stats = this.calculateStats();
      this.toggleAddUserForm();
      alert(`Employee ${this.newUser.name} added successfully!`);
    } else {
      alert('Employee ID already exists!');
    }
  }

  editUserFunc(user: User) {
    this.selectedUser = user;
    this.editUserData = {
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      department: user.department,
      password: ''
    };
    this.showEditUserForm = true;
    this.showAddUserForm = false;
  }

  updateUser() {
    if (!this.selectedUser) return;

    const updates: Partial<User> = {
      name: this.editUserData.name,
      email: this.editUserData.email,
      department: this.editUserData.department
    };

    if (this.editUserData.password) {
      updates.password = this.editUserData.password;
    }

    const success = this.authService.updateUser(this.selectedUser.employeeId, updates);
    
    if (success) {
      this.employees = this.authService.getAllUsers();
      this.showEditUserForm = false;
      this.selectedUser = null;
      alert('Employee updated successfully!');
    } else {
      alert('Failed to update employee');
    }
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      const success = this.authService.deleteUser(user.employeeId);
      
      if (success) {
        this.employees = this.authService.getAllUsers();
        this.stats = this.calculateStats();
        alert('Employee deleted successfully!');
      } else {
        alert('Failed to delete employee');
      }
    }
  }

  cancelEdit() {
    this.showEditUserForm = false;
    this.selectedUser = null;
  }

  getRoleBadgeClass(role: string): string {
    return role === 'hr-admin' ? 'role-admin' : 'role-employee';
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'progress-high';
    if (progress >= 50) return 'progress-medium';
    return 'progress-low';
  }

  getRandomProgress(): number {
    // Generate random progress for demo purposes
    return Math.floor(Math.random() * 100);
  }
}
