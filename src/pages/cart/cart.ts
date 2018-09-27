import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { SelectAddressesPage } from '../select_address/select_address';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  selectedItem: any;
  seletedid: any;
  ItemData: any;
  queryText: any = 'all';
  public load: boolean = true;
  public imageList: any = [];

  submitted: boolean = false;
  child: any;
  age: any;


  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;


  constructor(
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    public storage: Storage,
    public userdata: UserData,
    public viewCtrl: ViewController,
    public toastController: ToastController,
  ) {

    this.loadCart();
  }

  loadCart() {
    this.total = 0.0;

    this.events.subscribe('cart:updated');
    this.storage.ready().then(() => {

      this.storage.get("cart").then((data) => {
        this.cartItems = data;
        console.log(this.cartItems);

        if (this.cartItems.length > 0) {

          this.cartItems.forEach((item, index) => {
            console.log(index);
            this.total = this.total + (item.product.price * item.qty)
          })

        } else {
          this.showEmptyCartMessage = true;
        }
      })

    })

  }

  removeFromCart(item: any, i: any) {

    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then(() => {

      this.total = this.total - (price * qty);

    });

    if (this.cartItems.length == 0) {
      this.showEmptyCartMessage = true;
    }


  }

  closeModal() {
    this.viewCtrl.dismiss();
  }



  changeQty(item: any, i: any, change: any) {

    let price = 0;
    let qty = 0;

    price = parseFloat(item.product.price);
    qty = item.qty;

    if (change < 0 && item.qty == 1) {
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[i] = item;

    this.storage.set("cart", this.cartItems).then(() => {

      this.toastController.create({
        message: "Cart Updated.",
        duration: 2000,
        showCloseButton: true
      }).present();
      this.events.publish('cart:updated');

    });
    this.loadCart();

  }

  checkout() {
    this.navCtrl.push(SelectAddressesPage);
  }

 
}
