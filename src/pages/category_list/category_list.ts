import { Component } from '@angular/core';
import { PopoverController, NavParams, NavController, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { ActionSheetController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'
import { CategoryAllPage } from '../category_all/category_all';
import { CategoryPage } from '../category/category';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  categries_list: any;

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
    public http: Http,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public file: File,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    this.getAllCategories();
  }

  updateTab() {
    console.log(this.queryText);
  }

  open_all(cat: any) {
    this.navCtrl.push(CategoryAllPage, { "category_id": cat.categoryId })
  }

  onCategory(product: any) {
    this.navCtrl.push(CategoryPage, { "productId": product.productId });
  }

  getAllCategories() {

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loader.present();
    console.log(this.common.GET_ALL_CATEGORIES);
    this.http.get(this.common.GET_ALL_CATEGORIES)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data.length > 0) {
          this.categries_list = data;
          loader.dismiss();
        }
        else {
          this.categries_list = [];
          loader.dismiss();
        }
      }, error => {
        console.log(error);
        loader.dismiss();
      });

  }

  //GET_ALL_CATEGORIES

}
