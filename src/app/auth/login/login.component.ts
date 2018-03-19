import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email, Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}