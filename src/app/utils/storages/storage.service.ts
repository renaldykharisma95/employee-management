import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setStorageData(data: any){
    localStorage.setItem('EMPLOYEE_DATA', JSON.stringify(data));
  }

  clearStorage(type: number){
    // type rule:
    // type 0 => untuk storage id data
    // type 1 => untuk storage all employee data
    switch(type){
      case 0:{
        localStorage.removeItem('EMPLOYEE_DATA');
        break;
      }
      case 1:{
        localStorage.clear();
        break;
      }
    }
  }

  getDataStorage(key: string) {
    return localStorage.getItem(key);
  }
}
