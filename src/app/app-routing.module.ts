import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SearchComponent } from './pages/search/search.component';
import { ResultComponent } from './pages/result/result.component';
import { ScoreComponent } from './pages/score/score.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [RoleGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [RoleGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
  { path: 'result', component: ResultComponent },
  { path: 'scores', component: ScoreComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
