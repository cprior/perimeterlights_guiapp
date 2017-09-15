import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsProvider } from '../providers/settings/settings';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage, IonicStorageModule } from '@ionic/storage';

//https://github.com/ionic-team/ionic-starter-super/blob/master/src/app/app.module.ts
export function provideSettings(storage: Storage) {
  return new SettingsProvider(storage, {
    resturl: 'http://localhost:8081/api/v1/test',
    mqtturl: 'http://localhost:1883', //8883 MQTT over SSL
    selectedTheme: 'light-theme',
    isNightMode: false
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: SettingsProvider, useFactory: provideSettings, deps: [Storage] },
    Network,
    ConnectivityServiceProvider,
  ]
})
export class AppModule { }
