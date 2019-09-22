import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AddArticleComponent } from './frontpage/add-article/add-article.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    AddArticleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
