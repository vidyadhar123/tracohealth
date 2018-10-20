import { Component } from '@angular/core';
import { PopoverController, NavParams, Refresher, NavController, AlertController, ToastController, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'


@Component({
  selector: 'my_feed',
  templateUrl: 'my_feed.html'
})
export class MyFeedPage {
  selectedItem: any;
  seletedid: any;
  ItemData: any;
  queryText: any = 'all';

  public load: boolean = true;

  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public cmpModule: ComponentsModule,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    // public loadingCtrl: LoadingController,
    //private http: Http,
    public userData: UserData,
    public navParams: NavParams,
    public common: Common
  ) {
    this.refreshList(null);
  }

  updateTab() {
    console.log(this.queryText);
  }

  refreshList(refresh: any = null) {
    void 0 === refresh && (refresh = null);
    this.getFeedList();
    if (refresh) refresh.complete();
  }

  doRefresh(refresher: Refresher) {
    this.refreshList(refresher);
  }

  getFeedList() {

    // this.load = true;
    // this.userData.getUser_ID().then((user_id: any) => {
    //   console.log(user_id);

    //   console.log(this.common.GET_MY_FEED_LIST + "?user_id=" + user_id);
    //   this.http.get(this.common.GET_MY_FEED_LIST + "?user_id=" + user_id)
    //     .map(res => res.json())
    //     .subscribe(data => {

    //       //let data = res.json();
    //       console.log(data);
    //       if (data.success) {
    //         console.log("done");

    //         console.log(data.data);
    //         this.ItemData = data.data;
    //         this.load = false;
    //       }
    //       else {
    //         this.ItemData = "";
    //         const toast = this.toastCtrl.create({
    //           message: data.message,
    //           duration: 2000
    //         });
    //         toast.present();
    //         this.load = false;
    //       }
    //     }, error => {
    //       var data = error.json();
    //       console.log(data);
    //       this.load = false;
    //     });
    // });
  }

  onNewPost() {
    this.navCtrl.push('NewFeedPage');
  }

  remove(item: any) {
    console.log(item);
    // this.alertCtrl.create({
    //   title: "Remove pet",
    //   message: "Would you like to remove ?",
    //   buttons: [{
    //     text: "Cancel",
    //     handler: () => {
    //       console.log("cancel");
    //     }
    //   }, {
    //     text: "Remove",
    //     handler: () => {
    //       console.log(this.common.USER_REMOVE_PHOTO + "?user_id=" + item.user_id + "&user_photo_id=" + item.user_photo_id);
    //       this.http.get(this.common.USER_REMOVE_PHOTO + "?user_id=" + item.user_id + "&user_photo_id=" + item.user_photo_id)
    //         .map(res => res.json())
    //         .subscribe(data => {
    //           console.log(data);
    //           if (data.success) {
    //             const toast = this.toastCtrl.create({
    //               message: data.message,
    //               duration: 2000,
    //               dismissOnPageChange: true,
    //             });
    //             toast.present();
    //             this.getFeedList();
    //           }
    //         }, error => {
    //           console.log(error);

    //         });
    //     }
    //   }
    //   ]
    // }).present()
  }

}
