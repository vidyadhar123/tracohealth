import { Component } from '@angular/core';
import { Events, NavParams,NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { PaymentmethodPage } from '../payment_method/payment_method';


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  public static addressList: any;
  // public selectedAddressList: any[] = new Array();
  public cartProducts: any;
  public totalItem: any;
  public Totals: any;
  public cartTotal: any;

  public url: any;
  public static selectedAddressStatic: any;
  public selectedAddress: any;
  public address_id: any;
  public showPayment: any = 1;

  total: any;
  cartItems: any;
  constructor(
    public events: Events,
    public navCtrl:NavController,
    public navParams: NavParams,
    public storage: Storage,
    public userData: UserData) {
    // console.log(this.navParams.data);
    this.showPayment = 1;
    this.loadCart();

    this.selectedAddress = this.navParams.get("address");
  }

  ionViewDidEnter() {
    // this.common.track("Checkout");
  }

  loadCart() {
    this.total = 0.0;

    this.events.subscribe('cart:updated');
    this.storage.ready().then(() => {

      this.storage.get("cart").then((data) => {
        this.cartItems = data;
        console.log(this.cartItems);

        if (this.cartItems.length > 0) {

          this.cartItems.forEach((item: any, index: any) => {
            console.log(index);
            this.total = this.total + (item.product.price * item.qty)
          })

        } else {
          // this.showEmptyCartMessage = true;
        }
      })

    })

  }
  loadAddresses() {

  }


  onPayment() {
    this.navCtrl.push(PaymentmethodPage);
  }


}
