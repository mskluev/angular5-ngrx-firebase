import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
