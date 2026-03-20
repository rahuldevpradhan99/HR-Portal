import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  progress: number;
  points: number;
  icon: string;
  topics: string[];
}

@Component({
  selector: 'app-learning',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './learning.html',
  styleUrl: './learning.css',
})
export class Learning {
  learningModules: LearningModule[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';

  constructor(private authService: AuthService) {
    this.initializeModules();
  }

  private initializeModules() {
    this.learningModules = [
      {
        id: '1',
        title: 'Company Culture & Values',
        description: 'Understanding our company culture, mission, and core values that drive our success.',
        category: 'Onboarding',
        duration: '45 min',
        difficulty: 'Beginner',
        completed: false,
        progress: 0,
        points: 50,
        icon: '🏢',
        topics: ['Mission Statement', 'Core Values', 'Team Structure', 'Communication Guidelines']
      },
      {
        id: '2',
        title: 'IT Security & Compliance',
        description: 'Essential security practices and compliance requirements for all employees.',
        category: 'Compliance',
        duration: '30 min',
        difficulty: 'Beginner',
        completed: false,
        progress: 0,
        points: 40,
        icon: '🔒',
        topics: ['Password Security', 'Data Protection', 'Acceptable Use Policy', 'Incident Reporting']
      },
      {
        id: '3',
        title: 'HR Policies & Benefits',
        description: 'Comprehensive overview of HR policies, benefits, and employee resources.',
        category: 'HR',
        duration: '60 min',
        difficulty: 'Beginner',
        completed: false,
        progress: 0,
        points: 60,
        icon: '📋',
        topics: ['Employee Handbook', 'Benefits Overview', 'Leave Policies', 'Performance Reviews']
      },
      {
        id: '4',
        title: 'Tools & Software Training',
        description: 'Master the essential tools and software used in your daily work.',
        category: 'Technical',
        duration: '90 min',
        difficulty: 'Intermediate',
        completed: false,
        progress: 0,
        points: 80,
        icon: '💻',
        topics: ['Office Suite', 'Communication Tools', 'Project Management', 'Internal Systems']
      },
      {
        id: '5',
        title: 'Team Collaboration',
        description: 'Learn effective collaboration techniques and teamwork best practices.',
        category: 'Soft Skills',
        duration: '40 min',
        difficulty: 'Intermediate',
        completed: false,
        progress: 0,
        points: 45,
        icon: '👥',
        topics: ['Team Dynamics', 'Communication Styles', 'Conflict Resolution', 'Remote Collaboration']
      },
      {
        id: '6',
        title: 'Project Management Basics',
        description: 'Introduction to project management methodologies and best practices.',
        category: 'Professional',
        duration: '75 min',
        difficulty: 'Advanced',
        completed: false,
        progress: 0,
        points: 75,
        icon: '📊',
        topics: ['Agile Methodology', 'Project Planning', 'Risk Management', 'Stakeholder Communication']
      }
    ];
  }

  get categories(): string[] {
    const cats = ['all', ...new Set(this.learningModules.map(m => m.category))];
    return cats;
  }

  get filteredModules(): LearningModule[] {
    let filtered = this.learningModules;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(m => m.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.topics.some(t => t.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  }

  startModule(module: LearningModule) {
    // In a real app, this would navigate to the module content
    alert(`Starting module: ${module.title}`);
  }

  completeModule(module: LearningModule) {
    module.completed = true;
    module.progress = 100;
    // In a real app, this would update the user's points and progress
    alert(`Module completed: ${module.title} - +${module.points} points! 🎉`);
  }

  updateProgress(module: LearningModule, progress: number) {
    module.progress = Math.min(100, Math.max(0, progress));
    if (module.progress === 100 && !module.completed) {
      this.completeModule(module);
    }
  }

  getTotalProgress(): number {
    const totalModules = this.learningModules.length;
    const completedModules = this.learningModules.filter(m => m.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  }

  getTotalPoints(): number {
    return this.learningModules
      .filter(m => m.completed)
      .reduce((sum, m) => sum + m.points, 0);
  }

  getCurrentUser() {
    return this.authService.getCurrentUserValue();
  }
}
