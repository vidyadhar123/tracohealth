import { Component } from '@angular/core';
import { PopoverController, NavParams, NavController, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { ActionSheetController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.html'
})
export class SubscriptionPage {
  selectedItem: any;
  seletedid: any;
  ItemData: any;
  queryText: any = 'all';
  public load: boolean = true;
  public imageList: any = [];

  submitted: boolean = false;
  child: any;
  age: any;

  Tracker_array: any =
    [
      {
        headerId: "1",
        header: "Body Weight loss",
        media: {
          type: "image",
          src: "assets/img/weight.jpg"
        }
      }, {
        headerId: "2",
        header: "Child Health tips",
        media: {
          type: "image",
          src: "assets/img/tpp.jpg"
        }
      }
    ]


  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public cmpModule: ComponentsModule,
    public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams,
    public common: Common,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public file: File,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {


  }

  updateTab() {
    console.log(this.queryText);
  }

  onSummary() {
    this.navCtrl.push("TrackSummaryPage");
  }


}
