import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {HeaderComponent} from './header/header.component';
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdExpansionModule, MdGridListModule, MdInputModule, MdMenuModule,
  MdSidenavModule, MdToolbarModule, MdCardModule, MdTabsModule, MdTableModule, MatTableModule, MatSortModule,
  MdPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {DashboardComponent} from './authentication/user-dashbord/user-dashboard.component';
import { ScannerPageComponent } from './scanner-page/scanner-page.component';
import {NotSignedInGuardsService} from './common/not-signed-in-guards.service';
import {SignedInAuthGuardService} from './common/signed-in-auth-guard.service';
import {EqualValidatorDirective} from './common/equal-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    WelcomePageComponent,
    ScannerPageComponent,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdGridListModule,
    MdToolbarModule,
    MdInputModule,
    MdDialogModule,
    MdExpansionModule,
    MdSidenavModule,
    MdCardModule,
    MdTabsModule,
    MdTableModule,
    MatSortModule,
    MdTabsModule,
    MatTableModule,
    MdPaginatorModule
  ],
  providers: [AuthenticationService, NotSignedInGuardsService, SignedInAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
