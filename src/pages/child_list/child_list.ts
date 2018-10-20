import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Common } from '../../providers/common';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserData } from '../../providers/user-data';
import { RegPage } from '../reg/reg';

@IonicPage()
@Component({
  selector: 'page-child_list',
  templateUrl: 'child_list.html',
})
export class ChildListPage {

  child_list: any;
  load: boolean = false;
  //WooCommerce: any;
  constructor(public navCtrl: NavController,
    public common: Common,
    public loadingCtrl: LoadingController,
    public userData: UserData,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http) {
    // this.order = this.navParams.get("order");



  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewDidEnter() {
    this.getChildList();
  }

  getChildList() {

    let loader = this.loadingCtrl.create({
    });
    loader.present();
    this.load = true;
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);
      console.log(this.common.CHILD_LIST + "?parentId=" + user_id);
      this.http.get(this.common.CHILD_LIST + "?parentId=" + user_id)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);

          if (data) {
            this.child_list = data;
            this.load = false;
            loader.dismiss();
          }
        }, error => {
          console.log(error);
          loader.dismiss();
          this.load = false;

        });
    })
  }


  addChild() {
    this.userData.getUser_ID().then((user_id: any) => {
      this.navCtrl.push(RegPage, { parentId: user_id });
    })

  }

  RemoveChild(item: any) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // console.log(params);
    let loader = this.loadingCtrl.create({
    });
    loader.present();
    this.load = true;
    let url = this.common.DELETE_CHILD + "?childId=" + item.id;
    this.http.post(url, "", { headers: headers })
      .subscribe((res: any) => {

        let data = res.json();
        console.log(data);
        if (data == true) {
          console.log("done");
          loader.dismiss();
          this.load = false;
          // this.navCtrl.push('RegistrationPage', { user_detail: this.user_detail, mobile: this.mobileno });
          this.getChildList();
        }
        else {
          this.load = false;

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
          this.load = false;

        });
        var data = error.json();
        console.log(data);
      });

  }

  EditChild(item: any) {
    this.userData.getUser_ID().then((user_id: any) => {
      this.navCtrl.push(RegPage, { parentId: user_id, child: item });
    })
  }

}
