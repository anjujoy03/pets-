import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import {AdminModule} from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import {HttpClientModule,HTTP_INTERCEPTORS}from  '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
 
    BrowserAnimationsModule,
    MatStepperModule,
    NgbModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
