// MODULES USED

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import 'hammerjs';

// COMPONENTS USED
import { AppComponent } from './app.component';

// INJECTIONS
const MODULES = [ BrowserModule, BrowserAnimationsModule , MatButtonModule, MatCheckboxModule, MatMenuModule ];
const COMPONENTS = [AppComponent];
const SINGLETONSERVICES = [];

@NgModule({
  declarations: [ ...COMPONENTS ],
  imports: [ ...MODULES ],
  providers: [ ...SINGLETONSERVICES ],
  bootstrap: [AppComponent]
})
export class AppModule { }
