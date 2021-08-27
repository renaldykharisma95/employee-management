import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/app/utils/employee-interface';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';
import { employeeCreateRoute, employeeListRoute, pageNumbering } from 'src/app/utils/shared-datas';
import { StorageService } from 'src/app/utils/storages/storage.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listofBreadCrumbs = employeeListRoute;
  numberingPage = pageNumbering;
  selectedPageNumber = '10';
  searchValue: string = null;
  listOfEmployee: employee [] = [];

  constructor(
    private observerService: ObserversServiceService,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.observerService.setMenuTitle('Employee List');
    this.observerService.setBreadcrumb(this.listofBreadCrumbs);
  }

  ngAfterViewInit(){
    this.getDataTable();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getDataTable(){
    this.observerService.employeedata.subscribe(data =>{
      this.listOfEmployee = data;
    });
  }

  actionClick(data: any){
    this.storageService.setStorageData(data, 1);
    this.route.navigateByUrl('/employee-list/employee-actions');
  }

  delete(){
    //
  }

}
