import { Component } from '@angular/core';
import { NavController,/* LoadingController,*/ ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public address: any;
  ionform: FormGroup;

  form: FormGroup;
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
    // public loadingCtrl: LoadingController,
    private http: Http,
    public userdata: UserData,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public common: Common) {

    this.getcountry();

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
      gender: ['Male'],
      birthdate: ['']
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      height: [''],
      weight: [''],
      technologies: this.formBuilder.array([
        this.initTechnologyFields()
      ])
    });

  }

  initTechnologyFields(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      height: [''],
      weight: ['']
    });
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.technologies;
    control.push(this.initTechnologyFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.technologies;
    control.removeAt(i);
  }

  onNext() {
    this.submitted = true;
    if (this.ionform.valid) {
      this.navCtrl.push('RegisterPage', { username: this.ionform.value.username, mobile: this.ionform.value.mobileno, password: this.ionform.value.password, user_detail: this.user_detail })
    }
  }


  onRegister() {
    this.navCtrl.push('RegPage');
    //this.submitted = true;
    // if (this.ionform.valid) {
    //   var params = "email=" + this.ionform.value.email +
    //     "&firstname=" + this.ionform.value.firstname +
    //     "&lastname=" + this.ionform.value.lastname +
    //     "&password=" + this.ionform.value.password +
    //     "&mobile_no=" + this.ionform.value.mobileno +
    //     "&city_id=" + this.ionform.value.city +
    //     "&state_id=" + this.ionform.value.state +
    //     "&country_id=" + this.ionform.value.country;


    //   var headers = new Headers();
    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   console.log(params);
    //   this.loading = true;
    //   let url = this.common.USER_REGISTRATION;
    //   this.http.post(url, params, { headers: headers })
    //     //.map(res => res.json())
    //     .subscribe(res => {

    //       let data = res.json();
    //       console.log(data);
    //       if (data.success) {
    //         console.log("done");
    //         this.loading = false;
    //         this.userdata.user_register(data.user_id, this.ionform.value.firstname, this.ionform.value.lastname, this.ionform.value.email, this.ionform.value.password, this.ionform.value.mobileno, data.qr_code);
    //         this.navCtrl.setRoot(HomePage);
    //         //

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
  }


  getcountry() {

    this.http.get(this.common.GET_COUNTRY)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          this.country = data.data;
        }
      }, error => {
        console.log(error);
        alert(JSON.stringify(error));
      });
  }

  getStates() {
    this.http.get(this.common.GET_STATE + '?country_id=' + this.ionform.value.country)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        // loader.dismiss();
        this.states = data.data;
      }, error => {
        console.log(error);
        alert(JSON.stringify(error));
      });
  }


  getCity() {
    this.http.get(this.common.GET_CITY + '?state_id=' + this.ionform.value.state)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        // loader.dismiss();
        this.city = data.data;
      }, error => {
        console.log(error);
        alert(JSON.stringify(error));
      });
  }




}
