import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/utils/employee-interface';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';
import { employeeListRoute, pageNumbering } from 'src/app/utils/shared-datas';

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
    private observerService: ObserversServiceService
  ) { }

  ngOnInit() {
    this.observerService.setMenuTitle('Employee List');
    this.observerService.setBreadcrumb(this.listofBreadCrumbs);
  }

}
