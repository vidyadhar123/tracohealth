import { Component } from '@angular/core';
import { NavController,/* LoadingController,*/ ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';

//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {


  public address: any;
  ionform: FormGroup;
  mobileno: any;

  user_data: any;

  public loading: boolean = false;

  constructor(public navCtrl: NavController,
    //private device: Device,
    public toastCtrl: ToastController,
    // public loadingCtrl: LoadingController,
   // private http: Http,
    public userdata: UserData,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public common: Common) {

    this.ionform = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(3), Validators.required])],
    });
  }


  onLogin() {
    // if (this.ionform.valid) {
    //   var params = "&email=" + this.ionform.value.email +
    //     "&password=" + this.ionform.value.password;


    //   var headers = new Headers();
    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   console.log(params);
    //   this.loading = true;
    //   let url = this.common.USER_LOGIN;
    //   this.http.post(url, params, { headers: headers })
    //     //.map(res => res.json())
    //     .subscribe(res => {

    //       let data = res.json();
    //       console.log(data);
    //       if (data.success) {
    //         console.log("done");
    //         this.loading = false;
    //         console.log(data.data[0]);
    //         this.navCtrl.setRoot(HomePage);
    //         this.user_data = data.data[0];
    //         this.userdata.user_register(this.user_data.user_id, this.user_data.firstname, this.user_data.lastname, this.ionform.value.email, this.ionform.value.password, this.user_data.mobile_no, this.user_data.qr_code);

    //       }
    //       else {
    //         const toast = this.toastCtrl.create({
    //           message: data.message,
    //           duration: 2000
    //         });
    //         toast.present();
    //         this.loading = false;
    //       }
    //     }, error => {
    //       var data = error.json();
    //       console.log(data);
    //       this.loading = false;
    //     });
    // }
    // else {
    //   const toast = this.toastCtrl.create({
    //     message: "Enter valid data",
    //     duration: 2000
    //   });
    //   toast.present();
    // }
  }


  onRegister() {
    this.navCtrl.push('RegistrationPage');
  }




}
