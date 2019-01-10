import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {RoomsComponent} from './admin/rooms/rooms.component';
import {ListComponent} from './admin/requests/list/list.component';
import {AddComponent} from './admin/requests/add/add.component';
import {ClientsComponent} from './admin/clients/clients.component';
import {SignupPermGuard} from './core/guards/signup-perm.guard';

const appRoutes: Routes = [{
  path: 'login', component: SigninComponent
}, {
  path: 'dashboard', component: DashboardComponent, canActivate: [SignupPermGuard]
}, {
  path: 'rooms', component: RoomsComponent, canActivate: [SignupPermGuard]
}, {
  path: 'clients', component: ClientsComponent, canActivate: [SignupPermGuard]
}, {
  path: 'add-request', component: AddComponent, canActivate: [SignupPermGuard]
}, {
  path: 'request-list', component: ListComponent, canActivate: [SignupPermGuard]
}, {
  path: '', redirectTo: 'dashboard', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
