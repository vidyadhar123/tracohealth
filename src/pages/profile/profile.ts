import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
//import { EditProfilePage } from '../edit_profile/edit_profile';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: any;
  lastname: any;
  useremail: any;
  usermobile: any;
  user_id: any;
  postcode: any;
  city_state_id: any;
  gstin: any;
  allowcall: any;

  Qr: any;

  posts = [];
  imageUrl: string = 'https://yannbf.github.io/ionic3-components/assets/img/profile/profile-cover.jpg';

  constructor(public navCtrl: NavController,
    public photoViewer: PhotoViewer,
    public userData: UserData) {

    this.getUserdata();

  }


  getUserdata() {
    this.userData.getUsername().then((username: any) => {
      console.log(username);
      this.username = username;
    });

    this.userData.getLast_Name().then((lastname: any) => {
      console.log(lastname);
      this.lastname = lastname;
    })

    this.userData.getUserEmail().then((useremail: any) => {
      console.log(useremail);
      this.useremail = useremail;
    });

    this.userData.getUserMobileno().then((usermobile: any) => {
      console.log(usermobile);
      this.usermobile = usermobile;
    });


    this.userData.getUser_ID().then((user_id: any) => {
      console.log(user_id);
      this.user_id = user_id;
    });

    this.userData.getQR().then((qr: any) => {
      console.log(qr);
      this.Qr = qr;
    });

  }

  onMyFeedPage(){
    this.navCtrl.push('MyFeedPage');
  }

  share(url: any) {
    console.log(url);
    this.photoViewer.show(url, 'My image title', { share: true });
  }

  onChangePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  // onEdit() {
  //   this.navCtrl.push(EditProfilePage, { user_id: this.user_id, gstin: this.gstin, email: this.useremail, address_1: this.city_state_id, allow_call: this.allowcall })
  // }

}
