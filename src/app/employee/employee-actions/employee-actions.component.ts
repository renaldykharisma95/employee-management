import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';
import { CURRENCY_MASK_IDR, employeeCreateRoute, employeeEditRoute, groupList, pageNumbering } from 'src/app/utils/shared-datas';
import { StorageService } from 'src/app/utils/storages/storage.service';

@Component({
  selector: 'app-employee-actions',
  templateUrl: './employee-actions.component.html',
  styleUrls: ['./employee-actions.component.scss']
})
export class EmployeeActionsComponent implements OnInit {  
  numberingPage = pageNumbering;
  employeeForm: FormGroup;
  arrCollectData: any [] = [];
  dataEmployee: any;
  listOfGroup = groupList;
  public idEmployee = Guid;
  currencyMask = CURRENCY_MASK_IDR;
  amount: any;
  innerWidth: any;

  constructor(
    private observerService: ObserversServiceService,
    private fb: FormBuilder,
    private route: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.dataEmployee = JSON.parse(this.storageService.getDataStorage('EMPLOYEE_DATA'));
    this.observerService.setMenuTitle(`Employee ${this.dataEmployee ? 'edit' : 'create'} Page`);
    this.observerService.setBreadcrumb(this.dataEmployee ? employeeEditRoute : employeeCreateRoute);
    this.setForm();
    this.employeeForm.get('group').setValue(this.listOfGroup[0].id);
    if(this.dataEmployee){
      this.setDataToForm(this.dataEmployee);
    }
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  setForm(){
    this.employeeForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      basicSalary: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      group: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  setDataToForm(data: any){
    this.employeeForm.get('username').setValue(data.username);
    this.employeeForm.get('firstname').setValue(data.firstname);
    this.employeeForm.get('lastname').setValue(data.lastname);
    this.employeeForm.get('email').setValue(data.email);
    this.employeeForm.get('birthdate').setValue(data.birthdate);
    this.employeeForm.get('basicSalary').setValue(data.basicSalary);
    this.employeeForm.get('status').setValue(data.status);
    this.employeeForm.get('group').setValue(data.group);
    this.employeeForm.get('description').setValue(data.description);
  }

  submitForm(): void {
    for (const i in this.employeeForm.controls) {
      if (this.employeeForm.controls.hasOwnProperty(i)) {
        this.employeeForm.controls[i].markAsDirty();
        this.employeeForm.controls[i].updateValueAndValidity();
      }
    }
  }

  submitData(type: number){
    switch(type){
      case 1:{
        this.submitForm();
        if(this.employeeForm.valid){
          this.observerService.setEmployeeData({id: this.dataEmployee ? this.dataEmployee.id :String(Guid.create()), ...this.employeeForm.value}, 
          !this.dataEmployee ? 0 : 1);
          this.storageService.clearStorage(0);
          this.route.navigate(['/employee-list']);
        }
        break;
      }
      case 2:{
        this.storageService.clearStorage(0);
        this.route.navigate(['/employee-list']);
        break;
      }
    }
  }
}
