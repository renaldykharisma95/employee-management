import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { ObserversServiceService } from "src/app/utils/observers/observers-service.service";
import {
  employeeAttribute,
  employeeListRoute,
  pageNumbering,
} from "src/app/helpers/shared-datas";
import { StorageService } from "src/app/utils/storages/storage.service";
import { formatMedia, mediaMatch } from "src/app/helpers/media";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
  listofBreadCrumbs: any[] = employeeListRoute;
  numberingPage: any[] = pageNumbering;
  listOfSearchAttribut: any[] = employeeAttribute;
  selectSearch: string = "status";
  selectedPageNumber: string = "10";
  searchValue: string = null;
  listOfEmployee: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  sortName: string | null = null;
  sortValue: string | null = null;
  isDeleteEmp: boolean = false;
  selectDelete: any;
  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(
    private observerService: ObserversServiceService,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.observerService.setMenuTitle("Employee List");
    this.observerService.setBreadcrumb(this.listofBreadCrumbs);
    this.isMobile = mediaMatch(formatMedia("max", 640));
    this.isTablet = mediaMatch(formatMedia("max", 1007));
    console.log('this.isTablet: ', this.isTablet);
  }

  ngAfterViewInit() {
    this.getDataTable();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.isMobile = mediaMatch(formatMedia("max", 640));
    this.isTablet = mediaMatch(formatMedia("max", 1007));
  }

  getDataTable() {
    this.observerService.employeedata.subscribe((data) => {
      data.map((x: any, idx: number) => {
        x.numbering = idx + 1;
      });
      this.listOfEmployee = data;
    });
  }

  actionClick(data: any) {
    this.storageService.setStorageData(data);
    this.route.navigateByUrl("/employee-list/employee-actions");
  }

  delete(data: any) {
    this.isDeleteEmp = true;
    this.selectDelete = data;
  }

  handleCancel() {
    this.selectDelete = {};
    this.isDeleteEmp = false;
  }

  handleOk() {
    this.observerService.setEmployeeData(this.selectDelete, 2);
    this.selectDelete = {};
    this.isDeleteEmp = false;
  }

  onPageNumberChange(event: string) {
    this.pageSize = Number(event);
  }

  sort(sort: { key: string; value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.sortingData();
  }

  sortingData() {
    const data = this.listOfEmployee.filter((item) => item);
    if (this.sortName && this.sortValue) {
      this.listOfEmployee = data.sort((a: any, b: any) =>
        this.sortValue === "ascend"
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
    } else {
      this.listOfEmployee = data;
    }
  }

  searchEmployee() {
    if (this.searchValue) {
      this.getDataTable();
      const data = this.listOfEmployee.filter(
        (x) => x[this.selectSearch] === this.searchValue
      );
      this.listOfEmployee = data;
    } else {
      this.getDataTable();
    }
  }
}
