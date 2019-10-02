import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Role } from './_models/role';
import { LoginComponent } from './login/login.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { InternComponent } from './intern/intern.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FrontpageComponent,
  },
  //{
  //  path: 'admin',
  //  component: AdminComponent,
  //  canActivate: [AuthGuard],
  //  data: { roles: [Role.Admin] }
  //},
  {
    path: 'intern',
    component: InternComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'frontpage',
    component: FrontpageComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
