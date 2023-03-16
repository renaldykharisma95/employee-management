import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CookiesService {

  constructor() { }

  setCookie(value: string, expireDays: number) {
    const d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires:string = `expires=${d.toUTCString()}`;
    document.cookie = `userData=${value}; ${expires}`
  }

  getCookie() {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `userData=`;
    let result: string;

    for (let i: number = 0; i < caLen; i += 1) {
      result = ca[i].replace(/^\s+/g, '');
        if (result.indexOf(cookieName) == 0) {
            return result.substring(cookieName.length, result.length);
        }
    }
    return '';
  }

  deleteCookie() {
    this.setCookie('', -1)
  }
}
