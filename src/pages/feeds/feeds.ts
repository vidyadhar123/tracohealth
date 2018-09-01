import { Component } from '@angular/core';
import { PopoverController, NavParams, Refresher, NavController, AlertController, ToastController, ModalController,/*, LoadingController*/} from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'

@Component({
  selector: 'feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {
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
    //private device: Device,
    public toastCtrl: ToastController,
    // public loadingCtrl: LoadingController,
    private http: Http,
    public alertCtrl: AlertController,
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

    this.load = true;
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);

      console.log(this.common.GET_FEEDS_LIST + "?user_id=" + user_id);
      this.http.get(this.common.GET_FEEDS_LIST + "?user_id=" + user_id)
        .map(res => res.json())
        .subscribe(data => {

          //let data = res.json();
          console.log(data);
          if (data.success) {
            console.log("done");

            console.log(data.data);
            this.ItemData = data.data;
            this.load = false;
          }
          else {
            this.ItemData = "";
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 2000
            });
            toast.present();
            this.load = false;
          }
        }, error => {
          var data = error.json();
          console.log(data);
          this.load = false;
        });
    });
  }

  onNewPost() {
    this.navCtrl.push('NewFeedPage');
  }


  LikePost(id: any) {

    this.load = true;
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);

      console.log(this.common.USER_LIKE_PHOTO_FEED + "?user_id=" + user_id + "&user_photo_id=" + id);
      this.http.get(this.common.USER_LIKE_PHOTO_FEED + "?user_id=" + user_id + "&user_photo_id=" + id)
        .map(res => res.json())
        .subscribe(data => {

          //let data = res.json();
          console.log(data);
          if (data.success) {
            console.log("done");
            this.getFeedList();
          }
          else {
            this.ItemData = "";
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 2000
            });
            toast.present();
            this.load = false;
          }
        }, error => {
          var data = error.json();
          console.log(data);
          this.load = false;
        });
    });
  }

  onReportSpam(id: any) {
    this.load = true;
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);

      console.log(this.common.USER_REPORT_SPAM + "?user_photo_id=" + id);
      this.http.get(this.common.USER_REPORT_SPAM + "?user_photo_id=" + id)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          if (data.success) {
            console.log("done");
            this.getFeedList();
          }
          else {
            this.ItemData = "";
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 2000
            });
            toast.present();
            this.load = false;
          }
        }, error => {
          var data = error.json();
          console.log(data);
          this.load = false;
        });
    });
  }


  unLikePost(id: any) {

    this.load = true;
    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);

      console.log(this.common.USER_UNLIKE_PHOTO_FEED + "?user_id=" + user_id + "&user_photo_id=" + id);
      this.http.get(this.common.USER_UNLIKE_PHOTO_FEED + "?user_id=" + user_id + "&user_photo_id=" + id)
        .map(res => res.json())
        .subscribe(data => {

          //let data = res.json();
          console.log(data);
          if (data.success) {
            console.log("done");
            this.getFeedList();
          }
          else {
            this.ItemData = "";
            const toast = this.toastCtrl.create({
              message: data.message,
              duration: 2000
            });
            toast.present();
            this.load = false;
          }
        }, error => {
          var data = error.json();
          console.log(data);
          this.load = false;
        });
    });
  }



  ReportClick(id: any) {
    console.log(id);
    this.alertCtrl.create({
      title: "Report As Sparm",
      message: "Report..",
      buttons: [{
        text: "Cancel",
        handler: () => {
          console.log("cancel");
        }
      }, {
        text: "Yes",
        handler: () => {
          this.onReportSpam(id);
        }
      }
      ]
    }).present()
  }

}
