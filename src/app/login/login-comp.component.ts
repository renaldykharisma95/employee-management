import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from '../utils/cookies/cookies.service';
import { EncryptService } from '../utils/encrypt-helper/encrypt.service';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {

  loginForm: FormGroup;
  innerWidth: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookiesService,
    private encryptService: EncryptService,
    ) { }

  ngOnInit() {
    this.setForm();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  setForm(){
    this.loginForm = this.fb.group({
      userName: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }

  loginSubmit(){
    this.submitForm();
    if(this.loginForm.valid){
      const loginValue = JSON.stringify({...this.loginForm.value});
      const encryptResult = this.encryptService.encrypt(loginValue);
      this.cookieService.setCookie(encryptResult, 1);
      this.router.navigate(['/employee-list']);
    }
  }
}
