import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SearchComponent } from './pages/search/search.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './header/header.component';
import { ErrorService } from './error.service';
import { ResultComponent } from './pages/result/result.component';
import { ScoreComponent } from './pages/score/score.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { SharedModule } from '@shared/shared.module'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    QuizComponent,
    SignupComponent,
    SearchComponent,
    HeaderComponent,
    ResultComponent,
    ScoreComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    GoogleMapsModule,
    CarouselModule,
    SharedModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true}, AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
