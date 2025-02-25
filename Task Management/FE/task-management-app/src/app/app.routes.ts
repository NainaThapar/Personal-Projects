import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { ActivityLogsComponent } from './components/activity-logs/activity-logs.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    // {
    //     path: '',
    //     title: 'App Home Page',
    //     component: LandingPageComponent,  
    // },
    // {
    //     path: 'register',
    //     title: 'App Register Page',
    //     component: AuthPageComponent,
    // },
    // {
    //     path: 'login',
    //     title: 'App Login Page',
    //     component: AuthPageComponent,
    // },
    // {
    //     path: 'tasks',
    //     title: 'App Tasks Page',
    //     component: TasksComponent,
    // },
    // {
    //     path: 'dashboard',
    //     title: 'App Dashboard Page',
    //     component: DashboardComponent,
    // },
    // {
    //     path: 'content',
    //     title: 'App Content Page',
    //     component: ContentLayoutComponent,
    // }

    { path: '', component: LandingPageComponent, pathMatch: 'full'  },
  {
        path: 'register',
        title: 'App Register Page',
        component: AuthPageComponent,
    },
    {
        path: 'login',
        title: 'App Login Page',
        component: AuthPageComponent,
    },
  {
    path: '',
    component: ContentLayoutComponent, // The container component with sidenav
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskManagementComponent },
      { path: 'activity', component: ActivityLogsComponent},
      {path: 'users', component: UserManagementComponent, canActivate: [RoleGuard]},
      { path: 'unauthorized', component: UnauthorizedComponent }
    ]
  }
];
