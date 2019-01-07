import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: SigninComponent
  }, {
    path: 'dashboard', component: DashboardComponent
  }, {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
