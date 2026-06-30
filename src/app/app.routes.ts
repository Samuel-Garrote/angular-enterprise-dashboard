import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail.component').then((m) => m.UserDetailComponent),
    canActivate: [authGuard],
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./pages/create-user/create-user.component').then((m) => m.CreateUserComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
