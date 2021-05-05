import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncsService {
  constructor() {}

  changeChar = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '=',
  ];
  encryptChange = [
    '<9',
    '&8',
    '<7',
    '<6',
    '&5',
    '<4',
    '<3',
    '<2',
    '<1',
    '<0',
    '$9',
    '<8',
    '&7',
    '&6',
    '<5',
    '$4',
    '&3',
    '&2',
    '&1',
    '$0',
    '&9',
    '$8',
    '$7',
    '!6',
    '$5',
    '&4',
    '!3',
    '$2',
    '$1',
    '&0',
    '!9',
    '%8',
    '!7',
    '$6',
    '%5',
    '!4',
    '$3',
    '!2',
    '!1',
    '!0',
    '%0',
    '%1',
    '%2',
    '%3',
    '%4',
    '!5',
    '%6',
    '%7',
    '!8',
    '%9',
    '*0',
    '*1',
    '*2',
  ];

  encryption(data: string | any[], hard: boolean = false): string {
    let arr = [];
    let encryptString = '';
    if (hard) {
      for (let i = data.length; i > 0; i--) {
        //harfleri tek tek al tersten yazdır ascii çevir, base64 ile şifrele
        arr.push(btoa(data[i - 1].charCodeAt(0)));
      }

      //şifrelenmiş harfleri tek stringe atıyoruz.
      arr.forEach((element) => {
        encryptString += element + '\n';
      });
      encryptString = btoa(encryptString);
    } else {
      encryptString = btoa(data.toString());
    }

    //şifrelenmiş harf cümlesini kendi metodum ile şifreliyorum.
    let fndindex = -1;
    for (let i = 0; i < this.changeChar.length; i++) {
      while (true) {
        // string dizi içerisinde aynı char ifadesinden kaç tane varsa şifrele.
        fndindex = encryptString.indexOf(this.changeChar[i]); //aynı char dan var mı diye kontrol ediliyor
        if (fndindex != -1)
          // eğer varsa
          encryptString = encryptString.replace(
            this.changeChar[i],
            this.encryptChange[i]
          );
        // charı değiştir.
        else break;
      }
    }
    return encryptString;
  }

  decryption(encryptString: string, hard: boolean = false): string {
    if (encryptString == null)
      //getItem yapıldığında eğer öyle bir name ait bir localstorage yoksa null olarak gelir.
      return null; // null olarak yollayıp if ile kontrol ettiğimiz localstorage varmı yokmuyu doğrulayabilir.

    //kendi şifrelediğim base64 decode ediyorum.
    let fndindex = -1;
    for (let i = 0; i < this.encryptChange.length; i++) {
      while (true) {
        fndindex = encryptString.indexOf(this.encryptChange[i]);
        if (fndindex != -1)
          encryptString = encryptString.replace(
            this.encryptChange[i],
            this.changeChar[i]
          );
        else break;
      }
    }

    let decodeString = '';

    if (hard) {
      let arr = [];
      arr = atob(encryptString).split('\n'); // şifreli harfler alınıyor.
      arr.splice(arr.length - 1); // fazlalık olan \n silinir.

      for (let i = arr.length; i > 0; i--) {
        //harfleri tek tek al tersten yazdırıp düzelt, ascii düzelt, base64 decode et.
        decodeString += String.fromCharCode(Number(atob(arr[i - 1])));
      }
    } else {
      decodeString = atob(encryptString);
    }

    return decodeString;
  }

  localStorageGetItem(select: string | any[]) {
    return this.decryption(localStorage.getItem(this.encryption(select)));
  }

  localStorageSetItem(select: string | any[], value: string | any[]) {
    localStorage.setItem(this.encryption(select), this.encryption(value));
  }

  localStorageRemoveItem(select: string | any[]) {
    localStorage.removeItem(this.encryption(select));
  }

  sessionStorageGetItem(select: string | any[]){
    return this.decryption(sessionStorage.getItem(this.encryption(select)));
  }

  sessionStorageSetItem(select: string | any[], value: string | any[]){
    sessionStorage.setItem(this.encryption(select), this.encryption(value));
  }

  sessionStorageRemoveItem(select: string | any[]){
    sessionStorage.removeItem(this.encryption(select));
  }
}
