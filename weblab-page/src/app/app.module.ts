import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { FrontpageComponent } from './frontpage/frontpage.component';
import { AddArticleComponent } from './frontpage/add-article/add-article.component';
import { CommonModule } from '@angular/common';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login/login.component';
import { InternComponent } from './intern/intern.component';
import { SpendenComponent } from './spenden/spenden.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AddUserComponent } from './userpage/add-user/add-user.component';
import { SpendenPopupComponent } from './frontpage/spenden-popup/spenden-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    AddArticleComponent,
    LoginComponent,
    InternComponent,
    SpendenComponent,
    UserpageComponent,
    AddUserComponent,
    SpendenPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
