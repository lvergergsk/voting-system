import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DataViewComponent} from './data-view/data-view.component';
import {ScannerPageComponent} from './scanner-page/scanner-page.component';
import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';
import {UploadPageComponent} from './upload-page/upload-page.component';
import {BallotCheckComponent} from './ballot-check/ballot-check.component';
import {AdminComponent} from './admin/admin.component';
import {newElectionComponent} from './admin/new-election/new-election.component';
import {GraphicalDataRepresentationComponent} from './graphical-data-representation/graphical-data-representation.component';

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

  {path: 'ballot-check', component: BallotCheckComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'data-view', component: DataViewComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'scanner', component: ScannerPageComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'upload', component: UploadPageComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'admin', component: AdminComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'admin/new-election', component: newElectionComponent, canActivate: [NotSignedInGuardsService]},
  {path: 'visual', component: GraphicalDataRepresentationComponent, canActivate: [NotSignedInGuardsService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
