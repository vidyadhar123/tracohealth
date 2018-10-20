import { Component } from '@angular/core';
import { PopoverController, NavParams, NavController, Events, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { ActionSheetController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'category',
  templateUrl: 'category.html'
})
export class CategoryPage {
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
  Tracker_array: any =
    [
      {
        id: "1",
        price: "100",
        title: "C1p1",
        description: "Well, this is the easiest one. You need to shortlist a list of preschools that fit into your budget before you start looking at other finer details.",
        featured_src: "assets/img/11.jpg"
      }
    ]

  product: any;


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
    public http: Http,
    public events: Events,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    this.loadCart();
    this.getProducts(this.navParams.get("productId"));
  }

  updateTab() {
    console.log(this.queryText);
  }


  ionViewWillEnter() {
    console.log("Enter");
    this.loadCart();
  }

  getProducts(product_id: any) {
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loader.present();
    console.log(this.common.GET_PRODUCT + "?productId=" + product_id);
    this.http.get(this.common.GET_PRODUCT + "?productId=" + product_id)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data) {
          this.product = data;
          loader.dismiss();
        }
        else {
          this.product = "";
          loader.dismiss();
        }
      }, error => {
        console.log(error);
        loader.dismiss();
      });

  }


  addToCart(product: any) {
    console.log("before");
    console.log(product);
    // product.price = 150;

    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {

          if (product.productId == data[i].product.productId) {
            let qty = data[i].qty;
            //data[i].product.price = 
            console.log("Product is already in the cart");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

        }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }

      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

      })

      this.loadCart();

    })

  }

  loadCart() {

    this.events.subscribe('cart:updated');
    this.storage.ready().then(() => {

      this.storage.get("cart").then((data) => {
        this.cartCount = data.length;
      })

    })

  }


  openCart() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(data => {
      console.log('dest2..' + data)
      this.loadCart();
    });
    modal.present();
  }


}
