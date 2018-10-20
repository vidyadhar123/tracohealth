import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { UserData } from '../providers/user-data';
import { LoginPage } from '../pages/login/login';
import { AndroidPermissions } from '@ionic-native/android-permissions';
// import 'rxjs/add/operator/map';
// import { GoogleMaps } from '../providers/google-maps';
// import { Geolocation } from '@ionic-native/geolocation';
// declare var google: any;

import { VerifyNumberPage } from '../pages/verify_number/verify_number';
//import { VerifyOtpPage } from '../pages/verify_otp/verify_otp';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;

}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  // @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  rootPage: any;
  user_name: any;
  user_profile: any;
  user_email: any;
  items: any;

  autocompleteService: any;
  placesService: any;

  show: boolean = false;
  inneritems: any;

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public userData: UserData,
    public androidPermissions: AndroidPermissions,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController

  ) {

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.rootPage = HomePage;
        this.enableMenu(hasLoggedIn === true);
      } else {
        this.rootPage = VerifyNumberPage;
        this.enableMenu(false);
      }
      this.platformReady()
    });
    this.listenToLoginEvents();
  }


  onPage(page: any) {
    this.nav.setRoot(page);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      // this.rootPage = VerifyNumberPage;
      this.enableMenu(false);
    });
  }

  ionViewDidEnter() {
    console.log("Enter App-Component Page");
  }

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      (success: any) => {
        console.log(success);
      },
      (err: any) => {

        console.log(err);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
          then(success => {
            console.log(success);
          },
            (err: any) => {
              console.log(err);
              console.log("cancelled")
            });
      });

    console.log("check");
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  }



  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      console.log("go into start");
      this.splashScreen.hide();
      this.checkPermission();

    }).catch((error: any) => {
      alert('Ready, ' + JSON.stringify(error));
      console.error(error)
    });
  }


  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedOutMenu');
  }


  logout() {
    console.log("logout");
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }


}
