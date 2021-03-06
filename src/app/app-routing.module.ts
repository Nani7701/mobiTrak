import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentComponent } from './shared/home-component/home-component.component';
import { SignInComponent } from './common/forms/sign-in/sign-in.component';
import { SignUpComponentComponent } from './common/forms/sign-up-component/sign-up-component.component';
import { ForgotPasswordComponentComponent } from './common/forms/forgot-password-component/forgot-password-component.component';
import { ResetPasswordComponentComponent } from './common/forms/reset-password-component/reset-password-component.component';
//profile component
import { UserDetailsComponentComponent } from './shared/userComponent/user-details-component/user-details-component.component';
import { AuthGuard } from './core/gaurds/auth.guard';




const routes: Routes = [
  {path:'', component:HomeComponentComponent},
  {path:'signIn', component:SignInComponent},
  {path:'signUp', component:SignUpComponentComponent},
  {path:'forgotPassword', component:ForgotPasswordComponentComponent},
  {path:'resetPassword', component:ResetPasswordComponentComponent},
  {path:'profile', component:UserDetailsComponentComponent,canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
