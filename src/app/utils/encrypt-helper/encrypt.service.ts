import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(data: string){
    const encrypt = CryptoJS.AES.encrypt(
      data,
      environment.encryptKey as string,
    ) as string;

    return String(encrypt);
  }

  decrypt(data: string){
    const decrypt = CryptoJS.AES.decrypt(data, environment.encryptKey as string);
    return decrypt.toString(CryptoJS.enc.Utf8);
  }
}
