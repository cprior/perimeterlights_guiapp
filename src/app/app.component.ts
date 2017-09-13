import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { DevicePage } from '../pages/device/device';

import { SettingsProvider } from '../providers/settings/settings';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  selectedTheme: String;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private connectivityService: ConnectivityServiceProvider,
    private settings: SettingsProvider) {
    this.initializeApp();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Device', component: DevicePage },
    ];

    //this.connectivityService.toastConnectivityChanges();
    this.connectivityService.monitor();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // https://github.com/ionic-team/ionic/issues/11557
      if (!document.URL.startsWith('http')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
