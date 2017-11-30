// MODULES USED
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import 'hammerjs';

// ROUTING
import { AppRouterModule } from './app.routing';

// HELPERS
import { customHttpProvider } from './_helpers/index';

// AUTH GAURD
import { AuthGuard } from './_guards/index';

// SERVICES USED
import { AlertService, AuthenticationService, UserService, UrlManagerService, ApiManagerService , ExaminationService, dashboardService } from './_services/index';

// COMPONENTS USED
import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AlertComponent } from './_directives/index';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent, DialogProfileComponent, DialogResetPassComponent } from './header/index';
import { DashboardComponent, DialogVideoComponent} from './_dashboard/index';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ExaminationComponent } from './examination/examination.component';


// VIDEOANGULAR IMPORTS
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

// INJECTIONS
const MODULES = [
  BrowserModule, FormsModule, AppRouterModule, HttpModule,
  BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
  MatMenuModule, MatFormFieldModule, MatInputModule, MatDialogModule,
  VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule,
  MatCardModule, MatIconModule, HttpClientModule, MatRadioModule
];

const COMPONENTS = [
  AppComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent,
  DashboardComponent, ForgetPasswordComponent, HeaderComponent, FooterComponent,
  ExaminationComponent, DialogVideoComponent, DialogProfileComponent, DialogResetPassComponent
];

const ENTRYCOMPONENTS = [
  DialogVideoComponent, DialogProfileComponent, DialogResetPassComponent, 
 
];
const SINGLETONSERVICES = [
  customHttpProvider, AuthGuard, AlertService, AuthenticationService, 
  UserService, UrlManagerService, ApiManagerService, ExaminationService, dashboardService
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [...MODULES],
  providers: [...SINGLETONSERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
