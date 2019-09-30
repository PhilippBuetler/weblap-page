import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { FrontpageComponent } from './frontpage/frontpage.component';
import { AddArticleComponent } from './frontpage/add-article/add-article.component';
import { CommonModule } from '@angular/common';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login/login.component';
import { InternComponent } from './intern/intern.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    AddArticleComponent,
    LoginComponent,
    InternComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
