import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatMedia, mediaMatch } from 'src/app/helpers/media';
import { CookiesService } from 'src/app/utils/cookies/cookies.service';
import { EncryptService } from 'src/app/utils/encrypt-helper/encrypt.service';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  isCollapsed: boolean = false;
  isNotListPage: boolean = false;
  menuTitle: string = '';
  breadCrumbData:any [] = [];
  nameUser: '';
  isLogOut: boolean = false;
  isMobile: boolean = false;

  constructor(
    private observerService: ObserversServiceService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookiesService,
    private encryptService: EncryptService,
    private route: Router,
  ) { }

  ngOnInit() {
    const decryptResult = this.encryptService.decrypt(this.cookieService.getCookie());
    if(!decryptResult) this.route.navigate(['/']);
    const getCookieData =  JSON.parse(decryptResult);
    this.nameUser = getCookieData.userName;
    this.breadCrumbData = [];
    this.isMobile = mediaMatch(formatMedia('max', 640))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = mediaMatch(formatMedia('max', 640));
  }

  ngDoCheck(){
    this.isNotListPage = !(this.route.url === "/employee-list");
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
    this.observerService.setEmployeeData([], 4);
    this.cookieService.deleteCookie();
    this.route.navigate(['']);
    this.isLogOut = false;
  }
}
