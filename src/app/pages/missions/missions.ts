import { Component } from '@angular/core';
import { Onboarding } from '../../services/onboarding';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions',
  imports: [CommonModule],
  templateUrl: './missions.html',
  styleUrl: './missions.css',
  animations: [
   trigger('badgeUnlock', [
    // Fires on initial render
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ]),
    // ✅ Fires when mission is marked complete
    transition('incomplete => complete', [
      style({ transform: 'scale(1)' }),
      animate('300ms ease-in-out', style({ transform: 'scale(1.05)' })),
    ])
  ])
  ]
})
export class Missions {
  missions: any[] = [];

  constructor(private service: Onboarding, private router: Router) {
    this.missions = this.service.missions.map((mission, index) => ({
      ...mission,
      completed: false,
      points: 100,
      estimatedTime: ['15 min', '20 min', '30 min', '45 min'][index] || '15 min'
    }));
  }

  getMissionIcon(index: number): string {
    const icons = ['🏢', '📋', '👥', '🎓'];
    return icons[index] || '🎯';
  }

  completeMission(mission: any) {
  if (!mission.completed) {
    // ✅ Replace the object instead of mutating it
    const index = this.missions.indexOf(mission);
    this.missions[index] = { ...mission, completed: true };
    
    this.service.completeMission(this.missions[index]);

    setTimeout(() => {
      alert(`Mission Completed: ${mission.title} +${mission.points} XP 🎉`);
    }, 100);
  }
}

  completedMissions(): number {
    return this.missions.filter(m => m.completed).length;
  }

  totalPoints(): number {
    return this.service.points;
  }
}
