import { Injectable } from '@angular/core';
//http://reactivex.io/documentation/subject.html
import { BehaviorSubject } from 'rxjs/Rx';
//https://github.com/ionic-team/ionic-starter-super/blob/master/src/providers/settings.ts
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<String>;
  //https://github.com/ionic-team/ionic-starter-super/blob/master/src/providers/settings.ts
  private SETTINGS_KEY: string = '_settings';
  settings: any;
  _defaults: any;
  _readyPromise: Promise<any>;

  //https://devdactic.com/dynamic-theming-ionic/
  constructor(public storage: Storage, defaults: any) {
    //constructor(public storage: Storage) {
    this.theme = new BehaviorSubject('light-theme');
    this._defaults = defaults;
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  //https://github.com/ionic-team/ionic-starter-super/blob/master/src/providers/settings.ts
  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        this.setActiveTheme(this.settings.selectedTheme);
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }

}