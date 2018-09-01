import { Component } from '@angular/core';
import { PopoverController, NavParams, NavController, ModalController/*, LoadingController*/ } from 'ionic-angular';
import { Common } from '../../providers/common';
//import { HomePage } from '../home/home';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageResizer } from '@ionic-native/image-resizer';
import { File } from '@ionic-native/file';
import { ActionSheetController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';

//import { Device } from '@ionic-native/device';
import { UserData } from '../../providers/user-data';
import { ComponentsModule } from '../../components/components.module'

@Component({
  selector: 'new_feed',
  templateUrl: 'new_feed.html'
})
export class NewFeedPage {
  selectedItem: any;
  seletedid: any;
  ItemData: any;
  queryText: any = 'all';
  ionform: FormGroup;
  public load: boolean = true;
  public imageList: any = [];

  submitted: boolean = false;
  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public cmpModule: ComponentsModule,
    //private device: Device,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public userData: UserData,
    public navParams: NavParams,
    public common: Common,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    private camera: Camera,
    private http: Http,
    private imageResizer: ImageResizer,
    public file: File,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    

    this.ionform = formBuilder.group({
      item_title: ['', Validators.compose([Validators.required])],
    });
  }

  updateTab() {
    console.log(this.queryText);
  }



  onPost() {
    this.submitted = true;
    if (this.ionform.valid) {
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.userData.getUser_ID().then((user_id: any) => {
        console.log(user_id);
        this.file.readAsDataURL(this.file.cacheDirectory, this.imageList[0].image_file_name.substr(this.imageList[0].image_file_name.lastIndexOf("/") + 1)).then(value_file => {
          var params = "user_id=" + user_id +
            "&photo_title=" + this.ionform.value.item_title +
            "&photo=" + value_file +
            "&total_like=0";
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          console.log(params);
          console.log(this.common.USER_INSERT_FEED);
          this.http.post(this.common.USER_INSERT_FEED, params, { headers: headers })
            .map(res => res.json())
            .subscribe(data => {

              console.log(data);
              //console.log("Count:" + count);
              //if (total_images == count) {
              loader.dismiss();
              this.navCtrl.pop().then(() => {
               
              });
              const toast = this.toastCtrl.create({
                message: 'Saved successfully.',
                duration: 2000
              });
              toast.present();
              //  }
            });
        });
      });
    }
  }


  pickImages() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Option',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              // allowEdit: true,
            }
            //imageData
            this.camera.getPicture(options).then((imageURI) => {
              console.log(imageURI);
              this.imageResizer.resize({
                uri: imageURI,
                quality: 60,
                width: 1280,
                folderName: this.file.cacheDirectory,
                height: 1280
              }).then((uri: any) => {
                //if (this.imageList.length < 2) {  // for basic version
                this.imageList.push({ image_file_name: uri, base64: true });
                console.log(uri);
              });
            }, (err: any) => {
              // Handle error
              console.log(err);
            });
          }
        },
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {

            // maximumImagesCount applied for the basic version
            const imageoptions: ImagePickerOptions = {
              quality: 100,
              maximumImagesCount: 1,
              width: 400,
              height: 400
              //maximumImagesCount: 2  // forbasic version
            }
            this.imagePicker.getPictures(imageoptions).then((images: any) => {
              console.log(images);
              for (var index = 0; index < images.length; index++) {
                var varfilename = images[index].substring(images[index].lastIndexOf("/") + 1);
                this.imageResizer.resize({
                  uri: images[index],
                  quality: 60,
                  folderName: this.file.cacheDirectory,
                  width: 1280,
                  height: 1280,
                  fileName: varfilename.replace(/[()/\\?%*:|"<>]/g, "")
                }).then((uri: any) => {
                  this.imageList.push({ image_file_name: uri });

                  console.log(uri);
                });
              }
              //console.log(JSON.stringify(this.imageList));
            }, (err: any) => {
              console.log(err);
            });
          }
        },
        {
          text: 'Remove',
          icon: 'close-circle',
          handler: () => {
            this.alertCtrl.create({
              title: "Remove Profile",
              message: "Would you like to remove your profile?",
              buttons: [{
                text: "Cancel",
                handler: () => {
                  console.log("cancel");
                }
              }, {
                text: "Remove",
                handler: () => {
                }
              }
              ]
            }).present()
          }
        },
        {
          text: 'cancel',
          icon: 'close',
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }

      ]
    });
    actionSheet.present();
  }
}
