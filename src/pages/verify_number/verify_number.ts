import { Component } from '@angular/core';
import { VerifyOtpPage } from '../verify_otp/verify_otp';
import { NavController } from 'ionic-angular';
//import { UserData } from '../../providers/user-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-verify_number',
  templateUrl: 'verify_number.html'
})
export class VerifyNumberPage {

  otp: any;
  ionform: FormGroup;
  submitted = false;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.ionform = formBuilder.group({
      mobileno: ['', Validators.compose([Validators.minLength(9), Validators.required])],
      is_check: [true, Validators.compose([Validators.required])],
    })
  }


  onSignup() {
    this.submitted = true;
    if (!this.ionform.value.is_check) {
      alert("Please check terms and conditon.!");
      return
    }
    if (this.ionform.valid) {
      this.otp = this.getotp(4);
      this.navCtrl.push(VerifyOtpPage, { otp: this.otp, mobile: this.ionform.value.mobileno });
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
