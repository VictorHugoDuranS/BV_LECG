import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { CartPage } from "../pages/cart/cart";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from "@ionic-native/onesignal";
import { IonicStorageModule } from "@ionic/storage";
import { WoocommerceProvider } from "../providers/woocommerce/woocommerce";
import { PayPal } from '@ionic-native/paypal/';
import { LoginProvider } from '../providers/login/login';
import { Configure } from '../providers/configure/configure'
import { WeatherAgentProvider } from '../providers/weather-agent/weather-agent';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SourcePage } from '../pages/source/source';
import { HomePage } from '../pages/home/home';







@NgModule({
  declarations: [
    MyApp,
    CartPage,
    SourcePage,
    HomePage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp/*, {
      mode: 'ios',
      iconMode: 'ios',
    }*/),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    SourcePage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider,
    PayPal, LoginProvider, Configure, WeatherAgentProvider, AndroidPermissions
  ]
})
export class AppModule {}
