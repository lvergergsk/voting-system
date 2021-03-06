import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
/** For the Admin Module */
import {AdminModule} from './admin/admin.module';

import {HeaderComponent} from './header/header.component';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule,
    MatRadioModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import {DataViewComponent} from './data-view/data-view.component';
import {ScannerPageComponent} from './scanner-page/scanner-page.component';
import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';
import {ServerInteractService} from './common/serverInteract.service';
import {HttpModule} from '@angular/http';
import {BallotCheckComponent} from './ballot-check/ballot-check.component';
import {ballotcheckService} from './ballot-check/ballot-check.service'
import {UploadPageComponent} from './upload-page/upload-page.component';
import {ScannerDownloadService} from './scanner-page/scanner-web.service';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {GraphicalDataRepresentationComponent} from './graphical-data-representation/graphical-data-representation.component';
import {DataViewService} from './common/data-view.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    WelcomePageComponent,
    DataViewComponent,
    ScannerPageComponent,
    BallotCheckComponent,
    GraphicalDataRepresentationComponent,
UploadPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    HttpModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule,
    MatRadioModule,
    ChartsModule,
MatTableModule,
MatSelectModule,
    /** Admin module*/
    AdminModule,
  ],
  providers: [AuthenticationService,
    NotSignedInGuardsService,
    SignedInAuthGuardService,
    ServerInteractService,
    DataViewService,
    ScannerDownloadService,
    ballotcheckService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
