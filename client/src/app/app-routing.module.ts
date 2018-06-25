import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogEditComponent } from './components/blog-edit/blog-edit.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//Guards
import { AuthGuard } from './services/auth.guard'
import { NotAuthGuard } from './services/not-auth.guard'

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog/:title',
    component: BlogComponent
  },
  {
    path: 'blog-edit',
    component: BlogEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: HomeComponent 
  }
];

@NgModule({
  declarations: [],
  imports: [ 
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }