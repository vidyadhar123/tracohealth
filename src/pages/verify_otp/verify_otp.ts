import { Component } from '@angular/core';
//import { RegistrationPage } from '../registration/registration';
import { NavController, NavParams } from 'ionic-angular';
//import { UserData } from '../../providers/user-data';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';

@Component({
  selector: 'page-verify_otp',
  templateUrl: 'verify_otp.html'
})
export class VerifyOtpPage {
  user_detail: any;
  is_verified: boolean = false;
  otp: any;
  mobileno: any;
  ionform: FormGroup;
  submitted = false;

  constructor(public navCtrl: NavController,
    public common: Common,
    public navParams: NavParams,
    public http: Http,
    public formBuilder: FormBuilder) {

    if (this.navParams.get('otp')) {
      console.log(this.navParams.get('otp'));

      this.otp = this.navParams.get('otp');
      //alert("your otp is " + this.otp);
    }

    if (this.navParams.get('is_verified')) {
      console.log(this.navParams.get('is_verified'));
      this.is_verified = this.navParams.get('is_verified');
    }

    if (this.is_verified) {
      if (this.navParams.get('user_detail')) {
        console.log(this.navParams.get('user_detail'));
        this.user_detail = this.navParams.get('user_detail');
      }
    }

    if (this.navParams.get('mobile')) {
      console.log(this.navParams.get('mobile'));
      this.mobileno = this.navParams.get('mobile');
    }

    this.ionform = formBuilder.group({
      otp: ['', Validators.compose([Validators.required])]
    })
  }


  onSignup() {

    this.submitted = true;

   // this.navCtrl.push('RegistrationPage');

    if (this.ionform.valid) {

      if (this.otp == this.ionform.value.otp) {
          this.navCtrl.push('RegistrationPage', { user_detail: this.user_detail });

      }
      else {
        alert("Please enter valid OTP.");
        return;
      }
    }

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
  }

}
