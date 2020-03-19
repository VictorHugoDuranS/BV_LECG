import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from "@ionic-native/onesignal";
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';

  constructor(private androidPermissions: AndroidPermissions, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public oneSignal: OneSignal) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

      this.splashScreen.hide();

      this.statusBar.backgroundColorByHexString('#c53030');
      this.oneSignal.startInit('5185b2a7-cce7-4e86-874b-a1e2f069a935', '433273385307');
                  
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
        });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      });

      this.oneSignal.endInit();

    });
  }
}
