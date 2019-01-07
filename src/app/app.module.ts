import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthModule} from './auth/auth.module';
import {UserService} from './auth/user.service';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { AddComponent } from './admin/requests/add/add.component';
import { ListComponent } from './admin/requests/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    NavbarComponent,
    RoomsComponent,
    ClientsComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
