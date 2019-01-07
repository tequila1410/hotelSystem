import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {RoomsComponent} from './admin/rooms/rooms.component';
import {ListComponent} from './admin/requests/list/list.component';
import {AddComponent} from './admin/requests/add/add.component';
import {ClientsComponent} from './admin/clients/clients.component';

const appRoutes: Routes = [{
  path: 'login', component: SigninComponent
}, {
  path: 'dashboard', component: DashboardComponent
}, {
  path: 'rooms', component: RoomsComponent
}, {
  path: 'clients', component: ClientsComponent
}, {
  path: 'add-request', component: AddComponent
}, {
  path: 'request-list', component: ListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
