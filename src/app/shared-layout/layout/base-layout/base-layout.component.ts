import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ObserversServiceService } from 'src/app/utils/observers/observers-service.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  
  isCollapsed: boolean = false;
  menuTitle: string = '';
  breadCrumbData = [];

  constructor(
    private observerService: ObserversServiceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.observerService.titlePage.subscribe(name => {
      this.menuTitle = name;
    });
    this.observerService.breadCrumb.subscribe(breadcrumb => {
      this.breadCrumbData = breadcrumb;
    });
    this.cdr.detectChanges();
  }

}
