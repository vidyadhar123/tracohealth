import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserData } from '../../providers/user-data';
//import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public address: any;
  ionform: FormGroup;

  mobileno: any;

  country: any;
  states: any
  city: any


  public loading: boolean = false;
  public user_detail: any;
  submitted = false;
  constructor(public navCtrl: NavController,
    // private device: Device,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private http: Http,
    public userdata: UserData,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public common: Common) {


    if (this.navParams.get('mobile')) {
      console.log(this.navParams.get('mobile'));
      this.mobileno = this.navParams.get('mobile');
    }

    if (this.navParams.get('user_detail')) {
      console.log(this.navParams.get('user_detail'));
      this.user_detail = this.navParams.get('user_detail');
    }


    this.ionform = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
      lastname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
      gender: ['0'],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.required])],
      email: [''],
      birthdate: ['']
    });
  }

  // onNext() {
  //   this.submitted = true;
  //   if (this.ionform.valid) {
  //this.navCtrl.push('RegisterPage', { parentfirstname: this.ionform.value.firstname, parentlastname: this.ionform.value.lastname })
  //   }
  // }


  onRegister() {
    // this.navCtrl.push('RegPage');
    this.submitted = true;

    if (this.ionform.valid) {
      var params = {
        emailId: this.ionform.value.email,
        firstName: this.ionform.value.firstname,
        lastName: this.ionform.value.lastname,
        passwordString: this.ionform.value.password,
        phoneNumber: parseInt(this.mobileno),
        gender: this.ionform.value.gender,
        dateOfBirth: this.ionform.value.birthdate
      };

      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append('Content-Type', 'application/json; charset=utf-8');
      console.log(params);
      let loader = this.loadingCtrl.create({

      });
      loader.present();
      let url = this.common.PARENT_REFGISTRATION;
      console.log(url);
      this.http.post(url, params, { headers: headers })
        //.map(res => res.json())
        .subscribe(res => {

          let data = res.json();
          console.log(data);
          if (data) {
            console.log("done");
            loader.dismiss();
            //this.userdata.user_register(data.user_id, this.ionform.value.firstname, this.ionform.value.lastname, this.ionform.value.email, this.ionform.value.password, this.ionform.value.mobileno, data.qr_code);
            // this.onLogin();
            this.navCtrl.setRoot(LoginPage);
          }
          else {
            const toast = this.toastCtrl.create({
              message: "Something went wrong! please try again",
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



  // onLogin() {
  //   if (this.ionform.valid) {
  //     // var params = "phoneNumber=" + this.ionform.value.phoneno +
  //     //   "&password=" + this.ionform.value.password;

  //     var headers = new Headers();
  //     headers.append('Access-Control-Allow-Origin', '*')
  //     headers.append('Content-Type', 'application/json; charset=utf-8');
  //     // console.log(params);
  //     let loader = this.loadingCtrl.create({

  //     });
  //     loader.present();

  //     let url = this.common.PARENT_LOGIN;
  //     console.log(url);
  //     this.http.post(url, JSON.stringify({ phoneNumber: this.mobileno, password: this.ionform.value.password }), { headers: headers })
  //       //.map(res => res.json())
  //       .subscribe(res => {
  //         let data = res.json();
  //         console.log(data);
  //         if (data) {



  //           this.userdata.user_Login(data.UserId,data.UserFullName);
  //           this.navCtrl.setRoot(HomePage);
  //           loader.dismiss();
  //         }
  //         else {
  //           const toast = this.toastCtrl.create({
  //             message: "Invalid Credential",
  //             duration: 2000
  //           });
  //           toast.present();
  //           loader.dismiss();
  //         }

  //       }, error => {
  //         loader.dismiss().then(_ => {
  //           const toast = this.toastCtrl.create({
  //             message: "Something went wrong! please try again",
  //             duration: 2000
  //           });
  //           toast.present();
  //         });
  //         var data = error.json();
  //         console.log(data);


  //       });
  //   }
  //   else {
  //     //  loader.dismiss();
  //     const toast = this.toastCtrl.create({
  //       message: "Invalid Credential",
  //       duration: 2000
  //     });
  //     toast.present();
  //   }
  // }





}
