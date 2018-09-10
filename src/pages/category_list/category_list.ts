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
  selector: 'category_list',
  templateUrl: 'category_list.html'
})
export class CategoryListPage {
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
        header: "Child Tracker",
        media: {
          type: "image",
          src: "assets/img/feed1.jpg"
        }
      }, {
        headerId: "2",
        header: "Child Gps Tracker",
        media: {
          type: "image",
          src: "assets/img/feed2.jpg"
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



}
