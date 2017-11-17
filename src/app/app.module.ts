// MODULES USED

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import 'hammerjs';

// ROUTING

import { AppRouterModule } from  './app.routing';

// HELPERS

import  { customHttpProvider } from './_helpers/index';

// AUTH GAURD

import { AuthGuard } from './_guards/index';

// SERVICES USED

import { AlertService, AuthenticationService, UserService } from './_services/index';

// COMPONENTS USED

import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AlertComponent } from './_directives/index';

// INJECTIONS
const MODULES = [ BrowserModule, FormsModule, AppRouterModule, HttpModule, BrowserAnimationsModule , MatButtonModule, MatCheckboxModule, MatMenuModule ];
const COMPONENTS = [AppComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent];
const SINGLETONSERVICES = [ customHttpProvider, AuthGuard, AlertService, AuthenticationService, UserService];

@NgModule({
  declarations: [ ...COMPONENTS ],
  imports: [ ...MODULES ],
  providers: [ ...SINGLETONSERVICES ],
  bootstrap: [AppComponent]
})
export class AppModule { }
