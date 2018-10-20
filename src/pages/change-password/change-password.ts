import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserData } from '../../providers/user-data';
// import { Common } from '../../providers/common';
// import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

  public pageTitle: any = "Change Password";
  ionform: FormGroup;
  submitAttempt: boolean = false;
  public companyItem: any;
  public hide: boolean = true;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    // private common: Common,
    public userData: UserData,
    //private http: Http, 
    //private loadingController: LoadingController
  ) {



    this.ionform = formBuilder.group({
      set_password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
      old_password: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Change Password');
  }


  // changePassword() {

  //   this.submitAttempt = true;

  //   if (!this.ionform.valid) {
  //     return;
  //   }
  //   let loader = this.loadingController.create({
  //     content: 'Please wait...'
  //   });
  //   loader.present();
  //   //console.log(this.feedback);
  //   console.log();
  //   this.userData.getUserEmail().then((email_id) => {
  //   var params = "email=" + email_id +
  //     "&old_password=" + this.ionform.value.old_password +
  //     "&new_password=" + this.ionform.value.set_password;

  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');


  //   console.log(params);
  //   console.log(this.common.USER_CHANGE_PASSWORD);
  //   //console.log(this.common.USER_CHANGE_PASSWORD_X);
  //   this.http.post(this.common.USER_CHANGE_PASSWORD, params, { headers: headers })
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       loader.dismiss();
  //       console.log(data);

  //       if (data.success) {
  //         this.navCtrl.pop().then(() => {
  //         });
  //         const toast = this.toastCtrl.create({
  //           message: 'Password SuccessFully Updated',
  //           duration: 2000
  //         });
  //         toast.present();
  //       } else {
  //         //alert(data.message);

  //         const toast = this.toastCtrl.create({
  //           message: 'Password Invalid Or Incorrect',
  //           duration: 2000
  //         });
  //         toast.present();
  //       }
  //     }, error => {
  //       loader.dismiss();
  //       console.log(error);
  //       // var data = error.json();

  //       // if (data.type && data.type === "error") {
  //       //   alert('Sorry, no internet connection. Please try again later.');
  //       // }
  //       // else if (data.message)
  //       //   alert(data.message);
  //     });
  //   });

  // }

  // validpassword() {
  //   if (this.ionform.value.confirm_password != this.ionform.value.set_password) {
  //     const toast = this.toastCtrl.create({
  //       message: 'Password does not match.',
  //       duration: 2000
  //     });
  //     toast.present();
  //   }
  //   else {
  //     //this.save();
  //     this.changePassword();
  //   }
  // }

}
