import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FeedsPage } from '../pages/feeds/feeds';


import { LoginPage } from '../pages/login/login';
import { TransactionPage } from '../pages/transaction/transaction';
import { RegistrationPage } from '../pages/registration/registration';
import { MyFeedPage } from '../pages/my_feed/my_feed';
import { NewFeedPage } from '../pages/new_feed/new_feed';
import { LocationTrackPage } from '../pages/location_track/location_track';

import { ImageResizer } from '@ionic-native/image-resizer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { Device } from '@ionic-native/device';
import { PipesModule } from '../pipes/pipes.module';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';

import { Common } from '../providers/common';
import { Clipboard } from '@ionic-native/clipboard';
import { UserData } from '../providers/user-data';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ComponentsModule } from '../components/components.module';
import { Connectivity } from '../providers/connectivity-service';
import { GoogleMaps } from '../providers/google-maps';
import { Network } from '../../node_modules/@ionic-native/network';

import { RegPage } from '../pages/reg/reg';


import { VerifyNumberPage } from '../pages/verify_number/verify_number';
import { VerifyOtpPage } from '../pages/verify_otp/verify_otp';

@NgModule({
  declarations: [
    ConferenceApp,
    TransactionPage,
    LoginPage,
    ChangePasswordPage,
    ProfilePage,
    FeedsPage,
    MyFeedPage,
    NewFeedPage,
    RegPage,
    LocationTrackPage,
    RegistrationPage,
    HomePage,
    VerifyNumberPage,
    VerifyOtpPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpModule,
    PipesModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: MyFeedPage, name: 'MyFeedPage', segment: 'my_feed' },
        { component: FeedsPage, name: 'FeedsPage', segment: 'feeds' },
        { component: NewFeedPage, name: 'NewFeedPage', segment: 'new_feed' },
        { component: LocationTrackPage, name: 'LocationTrackPage', segment: 'location_track' },
        { component: VerifyNumberPage, name: 'VerifyNumberPage', segment: 'verifynumber' },
        { component: VerifyOtpPage, name: 'VerifyOtpPage', segment: 'verifyotp' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: ChangePasswordPage, name: 'ChangePasswordPage', segment: 'change-password' },
        { component: RegistrationPage, name: 'RegistrationPage', segment: 'registration' },
        { component: RegPage, name: 'RegPage', segment: 'reg' },

        { component: TransactionPage, name: 'TransactionPage', segment: 'transaction' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    HomePage,
    LoginPage,
    MyFeedPage,
    FeedsPage,
    RegPage,
    ChangePasswordPage,
    NewFeedPage,
    ProfilePage,
    LocationTrackPage,
    RegistrationPage,
    TransactionPage,
    VerifyNumberPage,
    VerifyOtpPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Common,
    UserData,
    SplashScreen,
    Clipboard,
    PhotoViewer,
    Device,
    Camera,
    File,
    Connectivity,
    GoogleMaps,
    FileTransfer,
    ImagePicker,
    ImageResizer,
    Geolocation,
    Network
  ]
})
export class AppModule { }
