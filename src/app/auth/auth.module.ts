import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule],
  exports: []
})
export class AuthModule {}
