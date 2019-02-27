import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpConfigInterceptor } from './configs/httpconfig.interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InfiniteScrollModule
  ],
  providers: [{   provide: HTTP_INTERCEPTORS, 
    useClass: HttpConfigInterceptor, 
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
