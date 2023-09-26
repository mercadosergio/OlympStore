import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
//Interceptors
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
//Angular Material


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WebsiteModule } from './modules/website/website.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    WebsiteModule,
    NotFoundComponent
],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
