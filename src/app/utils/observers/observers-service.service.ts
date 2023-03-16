import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployee } from 'src/app/employee/interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class ObserversServiceService {

  arrCollectData:IEmployee [] = []

  private titlepage = new BehaviorSubject('');
  titlePage = this.titlepage.asObservable();

  private breadcrumb = new BehaviorSubject([]);
  breadCrumb = this.breadcrumb.asObservable();

  private employeedatas = new BehaviorSubject([]);
  employeedata = this.employeedatas.asObservable();

  setMenuTitle(name: string) {
    this.titlepage.next(name);
  }

  setBreadcrumb(name: any) {
    this.breadcrumb.next(name);
  }

  setEmployeeData(data: any, type: number){
    switch(type){
      case 0:{
        this.arrCollectData = [...this.arrCollectData, data];
        this.employeedatas.next(this.arrCollectData);
        break;
      }
      case 1:{
        for (var i in this.arrCollectData) {
          if (this.arrCollectData[i].id == data.id) {
             this.arrCollectData[i] = data;
             break;
          }
        }
        this.employeedatas.next(this.arrCollectData);
        break;
      }
      case 2:{
        this.arrCollectData = this.arrCollectData.filter(x=>x.id !== data.id);
        this.employeedatas.next(this.arrCollectData);
        break;
      }
      case 4:{
        this.arrCollectData = [];
        this.employeedatas.next(this.arrCollectData);
        break;
      }
    }
  }
}
