import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Common } from '../../providers/common';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html'
})
export class RegPage {
  public address: any;
  //ionform: FormGroup;

  form: FormGroup;
  mobileno: any;

  country: any;
  states: any
  city: any

  parent_id: any;
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

    // this.getcountry();

    if (this.navParams.get('parentId')) {
      console.log(this.navParams.get('parentId'));
      this.parent_id = this.navParams.get('parentId');
    }

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lname: ['', Validators.required],
      bdate: ['', Validators.required],
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
      lname: ['', Validators.required],
      bdate: ['', Validators.required],
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


  onRegister() {
    // this.navCtrl.setRoot(HomePage);
    this.submitted = true;
    console.log(this.form.value.technologies);


    this.form.value.technologies.forEach((element: any) => {
      if (this.form.controls.technologies.valid) {
        var params = {
          "parentId": this.parent_id,
          "firstName": element.name,
          "lastName": element.lname,
          "dateOfBirth": element.bdate,
          "height": element.height,
          "weight": element.weight,
          "gender": 0,
          "parentFirstName": '',
          "parentLastName": ''
        }

        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log(params);
        let loader = this.loadingCtrl.create({

        });
        loader.present();
        let url = this.common.CHILD_REGISTRATION;
        this.http.post(url, params, { headers: headers })
          .subscribe((res: any) => {

            let data = res.json();
            console.log(data);
            if (data) {
              console.log("done");
              loader.dismiss();
              this.navCtrl.pop();
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
    });

  }






}
