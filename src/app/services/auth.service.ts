import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'hr-admin' | 'employee';
  department: string;
  password: string; // In real app, this would be hashed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private users: User[] = [
    {
      id: '1',
      employeeId: 'HR001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'hr-admin',
      department: 'Human Resources',
      password: 'admin123'
    },
    {
      id: '2',
      employeeId: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'employee',
      department: 'Engineering',
      password: 'emp123'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  login(employeeId: string, password: string): boolean {
    const user = this.users.find(u => u.employeeId === employeeId && u.password === password);
    
    if (user) {
      const userToStore: Omit<User, 'password'> = {
        id: user.id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      };
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      }
      this.currentUserSubject.next(userToStore as User);
      return true;
    }
    
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isHrAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role === 'hr-admin';
  }

  isEmployee(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role === 'employee';
  }

  getAllUsers(): User[] {
    return this.users;
  }

  addUser(user: Omit<User, 'id'>): boolean {
    const existingUser = this.users.find(u => u.employeeId === user.employeeId);
    if (existingUser) {
      return false;
    }
    
    const newUser: User = {
      ...user,
      id: (this.users.length + 1).toString()
    };
    
    this.users.push(newUser);
    return true;
  }

  updateUser(employeeId: string, updates: Partial<User>): boolean {
    const userIndex = this.users.findIndex(u => u.employeeId === employeeId);
    if (userIndex === -1) {
      return false;
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return true;
  }

  deleteUser(employeeId: string): boolean {
    const userIndex = this.users.findIndex(u => u.employeeId === employeeId);
    if (userIndex === -1) {
      return false;
    }
    
    this.users.splice(userIndex, 1);
    return true;
  }
}
