import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './services/admin.guard';
import { LoginGuard } from './services/login.guard';
import { AuthGuard } from './services/auth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [LoginGuard] },

  { path: 'home', loadChildren: () => import('./sidebar/sidebar.module').then(m => m.SidebarModule), canActivate: [AdminGuard] },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
