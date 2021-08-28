import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';
import { employeeAttribute, employeeListRoute, pageNumbering } from 'src/app/utils/shared-datas';
import { StorageService } from 'src/app/utils/storages/storage.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listofBreadCrumbs: any [] = employeeListRoute;
  numberingPage: any [] = pageNumbering;
  listOfSearchAttribut: any [] = employeeAttribute;
  selectSearch:string = '1';
  selectedPageNumber:string = '10';
  searchValue: string = null;
  listOfEmployee: any [] = [];
  pageIndex:number = 1;
  pageSize:number = 10;
  sortName: string | null = null;
  sortValue: string | null = null;
  isDeleteEmp: boolean = false;
  selectDelete: any;
  public innerWidth: any;

  constructor(
    private observerService: ObserversServiceService,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.observerService.setMenuTitle('Employee List');
    this.observerService.setBreadcrumb(this.listofBreadCrumbs);
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit(){
    this.getDataTable();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getDataTable(){
    this.observerService.employeedata.subscribe(data =>{
      data.map((x: any, idx: number)=>{
        x.numbering = idx + 1;
      });
      this.listOfEmployee = data;
    });
  }

  actionClick(data: any){
    this.storageService.setStorageData(data, 1);
    this.route.navigateByUrl('/employee-list/employee-actions');
  }

  delete(data: any){
    this.isDeleteEmp = true;
    this.selectDelete = data;
  }

  handleCancel(){
    this.selectDelete = {};
    this.isDeleteEmp = false;
  }

  handleOk(){
    this.observerService.setEmployeeData(this.selectDelete, 2);
    this.selectDelete = {};
    this.isDeleteEmp = false;
  }

  onPageNumberChange(event: string){
    this.pageSize = Number(event);
  }

  sort(sort: {key: string; value: string;}){
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.sortingData();
  }

  sortingData(){
    const data = this.listOfEmployee.filter(item => (item));
    if(this.sortName && this.sortValue){
      this.listOfEmployee = data.sort((a: any, b: any) =>
        this.sortValue === 'ascend' ?
        a[this.sortName] > b[this.sortName] ? 1 : -1 
        :
        b[this.sortName] > a[this.sortName] ? 1 : -1
      );
    }else{
      this.listOfEmployee = data;
    }
  }

  searchEmployee(){
    if(this.searchValue){
      this.getDataTable();
      switch(this.selectSearch){
        case '1':{
          let data = this.listOfEmployee.filter(x => x.status === this.searchValue);
          this.listOfEmployee = data;
          break
        }
        case '2' :{
          let data = this.listOfEmployee.filter(x => x.username === this.searchValue);
          this.listOfEmployee = data;
          break
        }
        case '3' :{
          let data = this.listOfEmployee.filter(x => x.firtname === this.searchValue);
          this.listOfEmployee = data;
          break
        }
        case '4' :{
          let data = this.listOfEmployee.filter(x => x.lastname === this.searchValue);
          this.listOfEmployee = data;
          break
        }
        case '5' :{
          let data = this.listOfEmployee.filter(x => x.email === this.searchValue);
          this.listOfEmployee = data;
          break
        }
        case '5' :{
          let data = this.listOfEmployee.filter(x => x.group === this.searchValue);
          this.listOfEmployee = data;
          break
        }
      }
    }else{
      this.getDataTable();
    }
  }
}
