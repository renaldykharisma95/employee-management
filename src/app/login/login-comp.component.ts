import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../utils/storages/storage.service';

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
    private storageService: StorageService
    ) { }

  ngOnInit() {
    this.setForm();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  setForm(){
    this.loginForm = this.fb.group({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
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
      this.storageService.setStorageData({...this.loginForm.value}, 0)
      this.router.navigate(['/employee-list']);
    }
  }

}
