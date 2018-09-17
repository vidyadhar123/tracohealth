import { Component } from '@angular/core';
//import { RegistrationPage } from '../registration/registration';
import { NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
//import { UserData } from '../../providers/user-data';
import { Http, Headers } from '@angular/http';
import { Common } from '../../providers/common';
//import { AndroidPermissions } from '@ionic-native/android-permissions';

//declare var SMS: any;
declare var window: any;

@Component({
  selector: 'page-verify_otp',
  templateUrl: 'verify_otp.html'
})
export class VerifyOtpPage {

  otp: any;
  mobileno: any;

  submitted = false;

  totp = '';
  mobile = '';

  vform: { otp?: any } = {};
  constructor(public navCtrl: NavController,
    public common: Common,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    // public androidPermissions: AndroidPermissions,
    public http: Http,
  ) {

    if (this.navParams.get('mobile')) {
      console.log(this.navParams.get('mobile'));
      this.mobileno = this.navParams.get('mobile');
    }


    // let me = this;
    // this.events.subscribe('otp:success', (eventData: any) => {
    //   console.log('Data:' + eventData);

    // });

    // -------------------------------------------------- AUTO SMS DETACT --//
    if (window.SmsReceiver) {
      window.SmsReceiver.startReception(({ messageBody = '', originatingAddress = '' }) => {
        console.log(originatingAddress);
        let otpCode = messageBody.substr(messageBody.length - 4);

        this.vform.otp = otpCode;
        this.verifyOTP();
        // me.events.publish('otp:success', otpCode);
      }, () => {
        alert("Error while receiving messages")
      })

    }
    else {
      // alert('Sorry we can\'t detact OTP in sms. Please enter OTP.');
    }

  }

  isValidOTP(value: any): any {
    let regExp = /^[0-9]{10}$/;
    console.log(value);
    if (!regExp.test(value) && (value.length != 4)) {
      console.log("test");
      const toast = this.toastCtrl.create({
        message: "Enter Valid Otp",
        duration: 2000
      });
      toast.present();
      return false;
    }
    return true;

  }


  // onSignup() {

  // this.submitted = true;

  // if (this.ionform.valid) {

  //   if (this.otp == this.ionform.value.otp) {
  //     this.navCtrl.push('RegistrationPage', { user_detail: this.user_detail, mobile: this.mobileno });

  //   }
  //   else {
  //     alert("Please enter valid OTP.");
  //     return;
  //   }
  // }




  // if (this.ionform.valid) {

  //   if (this.otp == this.ionform.value.otp) {
  //     if (this.is_verified) {
  //       this.navCtrl.push('ResetPasswordPage', { user_detail: this.user_detail });
  //     }
  //     else {
  //       console.log(this.common.URL_GET_BY_MOBILE + "?user_mobile_no=" + this.mobileno)
  //       this.http.get(this.common.URL_GET_BY_MOBILE + "?user_mobile_no=" + this.mobileno)
  //         .map(res => res.json())
  //         .subscribe(data => {
  //           console.log(data);
  //           if (data.success) {
  //             console.log(data.data[0]);
  //             this.navCtrl.push(RegistrationPage, { mobile: this.mobileno, user_detail: data.data[0] });
  //           }
  //           else {
  //             this.navCtrl.push(RegistrationPage, { mobile: this.mobileno });
  //           }
  //         }, error => {
  //           console.log(error);
  //           alert(JSON.stringify(error));
  //         });
  //     }
  //   }
  //   else {
  //     alert("Invalid OTP, Please enter valid OTP.");
  //     return;
  //   }

  // }
  // else {
  //   alert("Please ente OTP.");
  //   return;
  // }
  // }

  //if permission granted

  // var me = this;
  // document.addEventListener('onSMSArrive', function (e: any) {
  //   var sms = e.data;
  //   console.log("received sms " + JSON.stringify(sms));

  //   if (sms.address == 'IM-TLSERP') //look for your message address
  //   {
  //     me.otp = sms.body.substr(sms.body.length - 4);
  //     me.stopSMS();
  //     me.verifyOTP();
  //   }
  // });

  // checkPermission() {
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
  //     (success: any) => {

  //       console.log(success);


  //       this.receiveSMS();
  //     },
  //     (err: any) => {

  //       console.log(err);
  //       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
  //         then(success => {
  //           console.log(success);
  //           this.receiveSMS();
  //         },
  //           (err: any) => {
  //             console.log(err);
  //             console.log("cancelled")
  //           });
  //     });

  //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  // }
  // receiveSMS() {

  //   if (SMS) SMS.startWatch(function () {
  //     console.log('watching started');
  //   }, function () {
  //     console.log('failed to start watching');
  //   });
  // }
  // stopSMS() {
  //   if (SMS) SMS.stopWatch(function () {
  //     console.log('watching stopped');
  //   }, function () {
  //     console.log('failed to stop watching');
  //   });
  // }

  verifyOTP() {
    console.log("verify otp");
    if (!this.vform.otp) {
      alert("Please enter OTP to verify");
      return;
    }
    
    if (this.mobileno.length == 0) {
      let alert = this.alertCtrl.create({
        title: 'OTP Required!',
        subTitle: 'Please enter your OTP and proceed',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      // this.http.get('http://192.168.0.100/nexmosms/verify_otp.php?mobile' + this.mobile + '&otp=' + this.otp)
      //   .map(res => res.json())
      //   .subscribe(res => {

      //     console.log(JSON.stringify(res));
      //     //write your logic once otp validation is done

      //   }, (err: any) => {
      //     console.log(err);
      //     console.log("failed");
      //   });
      // var params = {
      //   "phoneNumber": this.ionform.value.mobileno,
      //   "recievedOTP": this.otp
      // }
      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append('Content-Type', 'application/json; charset=utf-8');
      // console.log(params);
      let loader = this.loadingCtrl.create({
      });
      loader.present();
      let url = this.common.VERIFY_OTP + "?phoneNumber=" + this.mobileno + "&recievedOTP=" + this.vform.otp;
      this.http.post(url, "", { headers: headers })
        .subscribe((res: any) => {

          let data = res.json();
          console.log(data);
          if (data == true) {
            console.log("done");
            loader.dismiss();
            // this.navCtrl.push('RegistrationPage', { user_detail: this.user_detail, mobile: this.mobileno });
            this.navCtrl.push('RegistrationPage', { mobile: this.mobileno });
          }
          else {
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 2000
            });
            toast.present();
            loader.dismiss();
          }
        }, error => {
          loader.dismiss().then(_ => {
            const toast = this.toastCtrl.create({
              message: "Something went wrong! please try again",
              duration: 2000
            });
            toast.present();
          });
          var data = error.json();
          console.log(data);
        });

    }
  }

}
