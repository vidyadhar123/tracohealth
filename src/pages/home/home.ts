
import { Component } from '@angular/core';
import { ModalController, NavController,/* Platform,*/ AlertController } from 'ionic-angular';
import { NewFeedPage } from '../new_feed/new_feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  home_array: any =
    [
      {
        "productId": "1",
        "media": {
          "type": "image",
          "src": "assets/img/pill-bottle.jpg"
        },
        "description": "Lorem Ipsum as model will many web sites still over publishing the years."
      },
      {
        "productId": "2",
        "media": {
          "type": "video",
<<<<<<< HEAD
          "src": "assets/img/ban2.jpg"
=======
          "src": "assets/img/pill-bottle.jpg"
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee
        },
        "description": "Lorem Ipsum as model will many web sites still over publishing the years."
      }
    ];


  News_array: any =
    [
      {
        feedId: "1",
        header: "Physician Finder",
        src: "assets/img/blog1.jpg",
        media: {
          id: "1",
          Type: "image",
          Src: "images / media1.png"
        },
        Content: "Browse our Physician directory to find the doctor that meets your specific needs and location."
      }
    ]





  queryText: any = '1';
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,

    public alertCtrl: AlertController
  ) {

    this.queryText = "1";

    console.log(this.home_array)
  }

  ionViewDidLoad() {

  }

  //Load banner and retrive image category wise 

<<<<<<< HEAD
  onTracker() {
    this.navCtrl.push(NewFeedPage);
  }
=======
>>>>>>> 3c97f7f905a04f85447947736bdf5bd526097cee





}
