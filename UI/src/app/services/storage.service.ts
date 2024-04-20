import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  key = "crack";
  constructor() { }


  public get(key) {
    let data =localStorage.getItem(key)||"";
    return this.decrypt(data);
  }

  set(key, value,expiry=""){
    localStorage.setItem(key, this.encrypt(value));
  }

  remove(key){
    localStorage.removeItem(key);
  }

  removeAll(){
    localStorage.clear();
  }


    //crypto wrapper

    private encrypt(txt: string): string {
      return CryptoJS.AES.encrypt(txt, this.key).toString();
    }
    private decrypt(txtToDecrypt: string) {
      return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
    }
}

