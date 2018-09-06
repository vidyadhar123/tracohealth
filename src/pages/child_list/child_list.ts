import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Common } from '../../providers/common';
import { Http } from '@angular/http';
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
  //WooCommerce: any;
  constructor(public navCtrl: NavController,
    public common: Common,
    public userData: UserData,
    public navParams: NavParams,
    public http: Http) {
    // this.order = this.navParams.get("order");

    

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewDidEnter(){
    this.getChildList();
  }

  getChildList() {
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);
      console.log(this.common.CHILD_LIST + "?parentId=" + user_id);
      this.http.get(this.common.CHILD_LIST + "?parentId=" + user_id)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          if (data) {
            this.child_list = data;
          }
        }, error => {
          console.log(error);
        });
    })
  }


  addChild() {
    this.userData.getUser_ID().then((user_id: any) => {
      this.navCtrl.push(RegPage, { parentId: user_id });
    })

  }

}
