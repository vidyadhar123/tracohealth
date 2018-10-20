import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Component } from '@angular/core';

import { Common } from '../../providers/common';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps';


@IonicPage()
@Component({
  selector: 'page-location_track',
  templateUrl: 'location_track.html',
})
export class LocationTrackPage {


  public item_detail: any;
  public loading: boolean = false;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  location: any;

  petdetail: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public maps: GoogleMaps,
    public platform: Platform,
    public geolocation: Geolocation,
    public common: Common) {


  }

  ionViewDidLoad() {

  }

  ionViewCanEnter() {


  }

  

}
