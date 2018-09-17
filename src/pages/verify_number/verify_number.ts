import { Component } from '@angular/core';
import { VerifyOtpPage } from '../verify_otp/verify_otp';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
//import { UserData } from '../../providers/user-data';
import { Http, Headers } from '@angular/http';
import { Common } from '../../providers/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-verify_number',
  templateUrl: 'verify_number.html'
})
export class VerifyNumberPage {

  otp: any;
  ionform: FormGroup;
  submitted = false;
  constructor(public navCtrl: NavController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public common: Common,

    public toastCtrl: ToastController,
    public formBuilder: FormBuilder) {

   // RegExp  reg: any = /^[0-9]{10}$/;
    this.ionform = formBuilder.group({
      mobileno: ['', Validators.compose([Validators.pattern("[0-9]{10,10}"), Validators.required])],
      is_check: [true, Validators.compose([Validators.required])],
    })
  }

  // isValidMobile(): any {
  //   let regExp = /^[0-9]{10}$/;
  //   console.log(this.ionform.value.mobileno);
  //   if (!regExp.test(this.ionform.value.mobileno)) {
  //     console.log("test");
  //     this.submitted = false;
  //     return false;
  //   }
  //   this.submitted = true;
  //   return true;
  // }



  onSignup() {
    //this.checkPermission();
    this.submitted = true;
    if (this.ionform.valid) {
      // var params = {
      //   "phoneNumber": this.ionform.value.mobileno
      // }
      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append('Content-Type', 'application/json; charset=utf-8');
      //console.log(params);
      let loader = this.loadingCtrl.create({

      });
      loader.present();
      let url = this.common.SEND_OTP + "?phoneNumber=" + this.ionform.value.mobileno;
      this.http.post(url, "", { headers: headers })
        .subscribe((res: any) => {

          let data = res.json();
          console.log(data);
          if (data == true) {
            console.log("done");
            loader.dismiss();
            this.navCtrl.push(VerifyOtpPage, { mobile: this.ionform.value.mobileno });
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

      // this.otp = this.getotp(4);
      // this.navCtrl.push(VerifyOtpPage, { otp: this.otp, mobile: this.ionform.value.mobileno });
    }

  }


  onTermsPage() {
    this.navCtrl.push('TermsAndConditionPage');
  }

  getotp(length: any) {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  onLogin() {
    this.navCtrl.push('LoginPage');
  }



}
