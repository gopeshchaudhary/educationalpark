import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { DashboardComponent } from './_dashboard/index';
import { AuthGuard } from './_guards/index';
import { RegisterComponent } from './register/index';
import { ForgetPasswordComponent } from './forget-password/index';
import { ExaminationComponent } from './examination/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgetPass', component: ForgetPasswordComponent },
    { path: 'exam', component: ExaminationComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
   

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRouterModule = RouterModule.forRoot(appRoutes);