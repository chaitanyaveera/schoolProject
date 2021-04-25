import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { SidebarComponent } from './sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'roles',
        pathMatch: 'full'
      },

      { path: 'teachers', loadChildren: () => import('../teachers/teachers.module').then(m => m.TeachersModule) },
      { path: 'roles', loadChildren: () => import('../roles/roles.module').then(m => m.RolesModule) },
      { path: 'students', loadChildren: () => import('../students-list/students-list.module').then(m => m.StudentsListModule) }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
