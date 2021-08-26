import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserversServiceService {

  private titlepage = new BehaviorSubject('');
  titlePage = this.titlepage.asObservable();

  private breadcrumb = new BehaviorSubject([]);
  breadCrumb = this.breadcrumb.asObservable();

  setMenuTitle(name: string) {
    this.titlepage.next(name);
  }

  setBreadcrumb(name: any) {
    this.breadcrumb.next(name);
  }
}
