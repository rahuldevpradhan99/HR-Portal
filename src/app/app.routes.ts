import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Missions } from './pages/missions/missions';
import { Learning } from './pages/learning/learning';
import { Leaderboard } from './pages/leaderboard/leaderboard';
import { HrAdmin } from './pages/hr-admin/hr-admin';

export const routes: Routes = [

  { path: '', component: Login },

  { path: 'dashboard', component: Dashboard },

  { path: 'missions', component: Missions },

  { path: 'learning', component: Learning },

  { path: 'leaderboard', component: Leaderboard },

  { path: 'admin', component: HrAdmin }

];