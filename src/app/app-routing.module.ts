import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { ScannerPageComponent } from './scanner-page/scanner-page.component';
import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';

const appRoute: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {
    path: 'user-dashboard',
    component: DashboardComponent,
    canActivate: [NotSignedInGuardsService],
    canActivateChild: [NotSignedInGuardsService]
  },
  {path: 'signup', component: SignupComponent, canActivate: [SignedInAuthGuardService]},
  {path: 'signin', component: SigninComponent, canActivate: [SignedInAuthGuardService]},
  {path: 'scanner', component: ScannerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
