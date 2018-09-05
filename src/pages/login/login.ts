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
<<<<<<< HEAD
    public loadingCtrl: LoadingController,
=======
    // public loadingCtrl: LoadingController,
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee
    private http: Http,
    public userdata: UserData,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public common: Common) {

    this.ionform = formBuilder.group({
      phoneno: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(3), Validators.required])],
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
<<<<<<< HEAD
      let loader = this.loadingCtrl.create({

      });
      loader.present();
=======
      this.loading = true;
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee

      let url = this.common.PARENT_LOGIN;
      console.log(url);
      this.http.post(url, JSON.stringify({ phoneNumber: this.ionform.value.phoneno, password: this.ionform.value.password }), { headers: headers })
        //.map(res => res.json())
        .subscribe(res => {
          let data = res.json();
          console.log(data);
          if (data) {
            this.navCtrl.setRoot(HomePage);
<<<<<<< HEAD
            loader.dismiss();
=======
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee
          }
          else {
            const toast = this.toastCtrl.create({
              message: "Invalid Credential",
              duration: 2000
            });
            toast.present();
<<<<<<< HEAD
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
    else {
      //  loader.dismiss();
=======
          }
          // if (data.success) {
          //   console.log("done");
          //   this.loading = false;
          //   console.log(data.data[0]);
          //   // this.navCtrl.setRoot(HomePage);
          //   // this.user_data = data.data[0];
          //   // this.userdata.user_register(this.user_data.user_id, this.user_data.firstname, this.user_data.lastname, this.ionform.value.email, this.ionform.value.password, this.user_data.mobile_no, this.user_data.qr_code);

          // }
          // else {
          //   const toast = this.toastCtrl.create({
          //     message: data.message,
          //     duration: 2000
          //   });
          //   toast.present();
          //   this.loading = false;

        }, error => {
          var data = error.json();
          console.log(data);
          this.loading = false;
        });
    }
    else {
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee
      const toast = this.toastCtrl.create({
        message: "Invalid Credential",
        duration: 2000
      });
      toast.present();
    }
  }


  onRegister() {
    this.navCtrl.push('RegistrationPage');
  }




}
