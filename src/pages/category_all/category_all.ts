import { Component } from '@angular/core';
import { PopoverController, NavParams, NavController, Events, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { ActionSheetController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'
import { CategoryPage } from '../category/category';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'category_all',
  templateUrl: 'category_all.html'
})
export class CategoryAllPage {
  selectedItem: any;
  seletedid: any;
  ItemData: any;
  queryText: any = 'all';
  public load: boolean = true;
  public imageList: any = [];

  submitted: boolean = false;
  child: any;
  age: any;
  cartCount: any;
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
    public events: Events,
    public http: Http,
    public navParams: NavParams,
    public common: Common,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public file: File,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    this.loadCart();

    this.getAllCategories(this.navParams.get("category_id"));
  }

  updateTab() {
    console.log(this.queryText);
  }

  onCategory(product: any) {
    this.navCtrl.push(CategoryPage, { "productId": product.productId });
  }

  openCart() {
    this.modalCtrl.create(CartPage).present();
  }


  loadCart() {

    this.events.subscribe('cart:updated');
    this.storage.ready().then(() => {

      this.storage.get("cart").then((data) => {
        this.cartCount = data.length;
      })

    })

  }

  getAllCategories(category_id: any) {
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loader.present();
    console.log(this.common.GET_CATEGORIES + "?categoryId=" + category_id);
    this.http.get(this.common.GET_CATEGORIES + "?categoryId=" + category_id)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data) {
          loader.dismiss();
          this.categries_list = data;
        }
        else {
          loader.dismiss();
          this.categries_list = [];
        }
      }, error => {
        console.log(error);

      });

  }




}
