import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Common } from '../../providers/common';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps';


declare var google: any;

@IonicPage()
@Component({
  selector: 'page-location_track',
  templateUrl: 'location_track.html',
})
export class LocationTrackPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

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
    public http: Http,
    public zone: NgZone,
    public maps: GoogleMaps,
    public platform: Platform,
    public geolocation: Geolocation,
    public common: Common) {


  }

  ionViewDidLoad() {


  }

  ionViewCanEnter() {


    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      console.log(this.placesService);
    });
    console.log(mapLoaded);

    // if (this.navParams.get("pet_data")) {
    //   console.log(this.navParams.get("pet_data"));
    //   this.petdetail = this.navParams.get("pet_data");
    //   this.selectPlace();
    // }

    this.http.get(this.common.GET_PBCM_LIST)
      .map(res => res.json())
      .subscribe(data => {

        //let data = res.json();
        console.log(data);
        if (data.success) {
          console.log("done");

          console.log(data.data);
          this.petdetail = data.data;

          this.Places();

        }
      }, error => {
        var data = error.json();
        console.log(data);

      });
  }

  // selectPlace() {
  //   console.log(this.petdetail);

  //   let location = {
  //     lat: parseFloat(this.petdetail.latitude),
  //     lng: parseFloat(this.petdetail.longitude),
  //     name: this.petdetail.pet_address
  //   };

  //   // this.zone.run(() => {

  //   this.maps.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     center: new google.maps.LatLng(location.lat, location.lng),
  //     zoom: 10
  //   });

  //   //this.maps.map.setCenter({ lat: location.lat, lng: location.lng });


  //   let infoWindow = new google.maps.InfoWindow({
  //     content: `<img width="160" height="120" src=${this.petdetail.image.pets_image}></img><br><h5 style="width: 170px;">${this.petdetail.pet_address}</h5>`
  //   });

  //   let marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(location.lat, location.lng),
  //     map: this.maps.map,
  //     title: this.petdetail.pet_address
  //   });

  //   console.log(marker);

  //   marker.addListener('click', () => {
  //     infoWindow.open(this.maps.map, marker);
  //   });

  //   this.location = location;
  //   console.log(this.location);
  //   //  });

  // }


  Places() {
    console.log(this.petdetail);
    console.log(this.petdetail.length);
    this.zone.run(() => {
      for (let i = 0; i < this.petdetail.length; i++) {

        console.log(parseFloat(this.petdetail[i].latitiude), parseFloat(this.petdetail[i].longtitude));
        this.maps.map.setCenter({ lat: parseFloat(this.petdetail[i].latitiude), lng: parseFloat(this.petdetail[i].longtitude) });
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(this.petdetail[i].latitiude), parseFloat(this.petdetail[i].longtitude)),
          map: this.maps.map
        });

        let infoWindow = new google.maps.InfoWindow({
          content: `<h5 style="width: 65%;">${this.petdetail[i].pbcm_name}</h5>`
        });
        console.log(marker);
        marker.addListener('click', () => {
          infoWindow.open(this.maps.map, marker);
        });

      }
    });

  }

  // let directionsService = new google.maps.DirectionsService;
  // let directionsDisplay = new google.maps.DirectionsRenderer;

  // directionsDisplay.setMap(this.maps.map);
  // directionsDisplay.setPanel(this.mapElement.nativeElement);

  // directionsService.route({
  //   origin: 'adelaide',
  //   destination: 'adelaide oval',
  //   travelMode: google.maps.TravelMode['DRIVING']
  // }, (res: any, status: any) => {

  //   if (status == google.maps.DirectionsStatus.OK) {
  //     directionsDisplay.setDirections(res);
  //   } else {
  //     console.warn(status);
  //   }

  // });




}
