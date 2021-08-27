import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setStorageData(data: any, type: number){
    // type rule:
    // type 0 => untuk storage user data
    // type 1 => untuk storage all employee data
    switch(type){
      case 0: {
        localStorage.setItem('USER_DATA', JSON.stringify(data));
        break;
      }
      case 1: {
        localStorage.setItem('EMPLOYEE_DATA', JSON.stringify(data));
        break;
      }
    }
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
