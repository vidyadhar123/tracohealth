import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';
import { HomePage } from '../home/home';

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
    public loadingCtrl: LoadingController,
    private http: Http,
    public userdata: UserData,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public common: Common) {

    this.ionform = formBuilder.group({
      phoneno: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }


  onLogin() {
    if (this.ionform.valid) {
      // var params = "phoneNumber=" + this.ionform.value.phoneno +
      //   "&password=" + this.ionform.value.password;

      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append('Content-Type', 'application/json; charset=utf-8');
      // console.log(params);
      let loader = this.loadingCtrl.create({

      });
      loader.present();

      let url = this.common.PARENT_LOGIN;
      console.log(url);
      this.http.post(url, JSON.stringify({ phoneNumber: this.ionform.value.phoneno, password: this.ionform.value.password }), { headers: headers })
        //.map(res => res.json())
        .subscribe(res => {
          let data = res.json();
          console.log(data);
          if (data) {

            var name = data.UserFullName;
            var name_split = name.split(" ");
            this.userdata.user_Login(data.UserId, name_split[0], name_split[1], data.Token);
            this.navCtrl.setRoot(HomePage);
            loader.dismiss();
          }
          else {
            const toast = this.toastCtrl.create({
              message: "Mobile number or password is incorrect",
              duration: 2000
            });
            toast.present();
            loader.dismiss();
          }

        }, error => {
          loader.dismiss().then(_ => {
            const toast = this.toastCtrl.create({
              message: "Mobile number or password is incorrect",
              duration: 2000
            });
            toast.present();
          });
          var data = error.json();
          console.log(data);


        });
    }
    else {
      //  loader.dismiss();
      const toast = this.toastCtrl.create({
        message: "Please enter Mobile number and Password",
        duration: 2000
      });
      toast.present();
    }
  }


  onRegister() {
    this.navCtrl.push('RegistrationPage');
  }




}
