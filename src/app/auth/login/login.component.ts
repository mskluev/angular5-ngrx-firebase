import { UIService } from './../../shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email, Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
