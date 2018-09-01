
import { Component } from '@angular/core';
import { ModalController, NavController,/* Platform,*/ AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  queryText: any = '1';
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
   
    public alertCtrl: AlertController
  ) {

    this.queryText="1";
  }

  ionViewDidLoad() {
   
  }

  //Load banner and retrive image category wise 
  





}
