import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.setForm();
  }

  setForm(){
    this.loginForm = this.fb.group({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  loginSubmit(){
    this.router.navigate(['/employee-list']);
  }

}
