import { Component } from '@angular/core';
import { Events, NavParams, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-payment_method',
  templateUrl: 'payment_method.html'
})
export class PaymentmethodPage {
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

  public payu_payment_method: any;

  total: any;
  cartItems: any;
  constructor(
    public events: Events,
    public navParams: NavParams,
    public storage: Storage,
    public iab: InAppBrowser,
    public navCtrl: NavController,
    public userData: UserData) {
    // console.log(this.navParams.data);
    this.showPayment = 1;
    this.loadCart();

    this.selectedAddress = this.navParams.get("address");

    // this.events.subscribe('payment:success', (eventData: any) => {
    //   // eventData is an array of parameters, so grab our first and only arg
    //   console.log('Data:', eventData[0]);
    //   alert('success');
    // });

    // this.events.subscribe('payment:cancel', (eventData: any) => {
    //   // eventData is an array of parameters, so grab our first and only arg
    //   console.log('Data:', eventData[0]);
    //   alert('Cancelled');
    // });
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


  place() {
    if (this.payu_payment_method == "cod") {

    }
    else {
      this.makePaymentPayu();
    }
  }



  makePaymentPayu() {

    let mobileno = 7600015403;
    let me = this;
    let requestUrl = 'http://servsme.in/PayU/PayUMoney_form.php'
      + '?amount=' + this.total
      + '&firstname=' + "test"
      + '&email=' + "test@gmail.com"
      + '&phone=' + mobileno
      + '&productinfo=trachohealth'
      + '&surl=http://return.url'
      + '&furl=http://cancel.url'
      + '&service_provider=payu_paisa'
      + '&key=eCnwbJos'
      + '&txnid=' + 1;

    console.log(requestUrl);
    const options: InAppBrowserOptions = {
      zoom: 'yes',
      location: 'no',
      toolbar: 'no'
    };
    const browser = this.iab.create(requestUrl, '_blank', options);
    console.log(browser);
    // let browser = this.iab.create(requestUrl, '_blank', 'location=no');
    browser.on('loadstart').subscribe((res: any) => {
      if (res.url.search('PayUMoney_form.php') > 0) {

      }
      else if (res.url.search('return.url') > 0) {
        browser.close();
        alert('Payment Success..!');
        this.navCtrl.popToRoot().then(() => {
          this.navCtrl.push(HomePage);
        });
        me.events.publish('payment:success', 1);
        return;
      }
      else if (res.url.search('cancel.url') > 0) {
        browser.close();
        alert('Payment Cancel..!');

        this.navCtrl.popToRoot().then(() => {
          this.navCtrl.push(HomePage);
        });

        me.events.publish('payment:cancel', 1);
      }

      console.log(res);
    });
  }


}
