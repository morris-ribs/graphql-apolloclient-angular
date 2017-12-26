import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DiscsPageComponent } from './discs-page/discs-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpLinkModule,
    ApolloModule,
    HttpClientModule
  ],
  declarations: [ AppComponent, DiscsPageComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'http://localhost:8090/'
      }),
      cache: new InMemoryCache()
    });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
