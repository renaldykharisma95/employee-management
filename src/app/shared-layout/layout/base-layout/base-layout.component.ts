import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';
import { StorageService } from 'src/app/utils/storages/storage.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  
  isCollapsed: boolean = false;
  menuTitle: string = '';
  breadCrumbData:any [] = [];
  nameUser: '';
  isLogOut: boolean = false;

  constructor(
    private observerService: ObserversServiceService,
    private cdr: ChangeDetectorRef,
    private localStorageService: StorageService,
    private route: Router
  ) { }

  ngOnInit() {
    this.nameUser = JSON.parse(this.localStorageService.getDataStorage('USER_DATA')).userName;
    this.breadCrumbData = [];
  }

  ngAfterViewInit(){
    this.observerService.titlePage.subscribe(name => {
      this.menuTitle = name;
    });
    this.observerService.breadCrumb.subscribe(breadcrumb => {
      this.breadCrumbData = breadcrumb;
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  signOut(){
    this.isLogOut = true;
  }

  handleCancel(){
    this.isLogOut = false;
  }
  
  handleOk(){
    this.localStorageService.clearStorage(1);
    this.route.navigate(['']);
    this.isLogOut = false;
  }
}
