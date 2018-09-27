import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';


@Component({
  selector: 'page-select_address',
  templateUrl: 'select_address.html'
})
export class SelectAddressesPage {

  arry_address: any = [
    {
      "address_id": "668",
      "firstname": "utsavi",
      "lastname": "bhatt",
      "company": "7600015403",
      "address_1": "104, riverview apt, nr ambicaniketan temple",
      "address_2": "athwalines, surat",
      "postcode": "395007",
      "city": "surat",
      "zone_id": "1485",
      "zone": "Gujarat",
      "zone_code": "GU",
      "country_id": "99",
      "country": "India",
      "iso_code_2": "IN",
      "iso_code_3": "IND",
      "address_format": ""
    },
    {
      "address_id": "598",
      "firstname": "Muzna",
      "lastname": "Noohu",
      "company": "7600015403",
      "address_1": "No 1681, 5th Cross Street ",
      "address_2": "Ram Nagar South",
      "postcode": "600091",
      "city": "Madipakkam",
      "zone_id": "1503",
      "zone": "Tamil Nadu",
      "zone_code": "TN",
      "country_id": "99",
      "country": "India",
      "iso_code_2": "IN",
      "iso_code_3": "IND",
      "address_format": ""
    }
  ]

  public addresses: any;
  public Totaladdresses: any;
  public AddressDetail: any[] = new Array();

  removeAddress: { address_id?: string } = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events) {

    // this.events.subscribe("removepro", (object: any) => {
    //   console.log(object);
    //   this.onLoad();
    // });
  }

  ionViewDidEnter() {
    // this.onLoad();
  }



  selectedAddress(selectaddress: any) {
    console.log(selectaddress);
    this.navCtrl.pop().then(() => {
      this.navCtrl.pop().then(() => {
        this.navCtrl.push(CheckoutPage, { address: selectaddress });
      });
    });
  }

}
