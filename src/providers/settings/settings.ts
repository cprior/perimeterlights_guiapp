import { Injectable } from '@angular/core';
//http://reactivex.io/documentation/subject.html
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<String>;

  //https://devdactic.com/dynamic-theming-ionic/
  constructor() {
    this.theme = new BehaviorSubject('light-theme');
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }
}