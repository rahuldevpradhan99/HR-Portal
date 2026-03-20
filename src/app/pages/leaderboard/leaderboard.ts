import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Onboarding } from '../../services/onboarding';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard {
  leaderboardData: any[] = [];
  currentUserRank: number = 0;

  constructor(private service: Onboarding) {
    this.generateLeaderboard();
  }

  generateLeaderboard() {
    // Sample leaderboard data with current user
    const employees = [
      { name: 'Ananya Sharma', points: 500, department: 'Engineering' },
      { name: 'Rahul Kumar', points: 450, department: 'Product' },
      { name: 'Priya Patel', points: 400, department: 'Design' },
      { name: 'Amit Singh', points: 350, department: 'Marketing' },
      { name: 'Neha Gupta', points: 300, department: 'HR' },
      { name: 'Vikram Reddy', points: 250, department: 'Sales' },
      { name: 'Kavita Nair', points: 200, department: 'Engineering' },
      { name: 'Rohit Jain', points: 150, department: 'Finance' }
    ];

    // Add current user
    const currentUser = {
      name: 'You',
      points: this.service.points,
      department: 'Your Department',
      isCurrentUser: true
    };

    // Combine and sort by points
    this.leaderboardData = [...employees, currentUser]
      .sort((a, b) => b.points - a.points)
      .map((employee, index) => ({
        ...employee,
        rank: index + 1
      }));

    // Find current user's rank
    const currentUserData = this.leaderboardData.find(emp => emp.isCurrentUser);
    this.currentUserRank = currentUserData ? currentUserData.rank : 0;
  }

  getRankMedal(rank: number): string {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  }

  getRankClass(rank: number): string {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    if (rank === this.currentUserRank) return 'current-user';
    return '';
  }
}
