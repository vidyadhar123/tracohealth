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
    public events: Events,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    this.loadCart();
  }

  updateTab() {
    console.log(this.queryText);
  }


  addToCart(product: any) {
    console.log(product);

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

          if (product.id == data[i].product.id) {
            let qty = data[i].qty;

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
    this.modalCtrl.create(CartPage).present();
  }


}
