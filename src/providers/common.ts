import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Device } from '@ionic-native/device';


@Injectable()
export class Common {

	static customer_id: any;
	constructor(public events: Events, public storage: Storage, public platform: Platform, public device: Device) {
		this.platform.ready().then(() => {

		});
	}


	public _strDeviceId: string = 'arjun'; //Secure.getString(AppController.getInstance().getContentResolver(), Secure.ANDROID_ID);

	// Random rnd = new Random();
	strDeviceId() {

		return this._strDeviceId + "&k=" + '12345'; // rnd.nextDouble();
	}

	//	private URL_ROOT: string = "http://diamond.servsme.in";
	private URL_ROOT: string = "http://49.50.103.230:81/api/";

	//http://pbcm.servsme.in/service/user_api/get_feed_list?user_id=2


	//Api URl 

	//Parent_call 
	public PARENT_REFGISTRATION: string = this.URL_ROOT + "User/CreateUser";
	public PARENT_LOGIN: string = this.URL_ROOT + "Authentication/Login";
	public CHILD_REGISTRATION: string = this.URL_ROOT + "Children/AddNewChild";
	public CHILD_LIST: string = this.URL_ROOT + "Children/GetAllChildByParentId";
	




	public USER_LOGIN: string = this.URL_ROOT + "user_api/user_login";
	public USER_REGISTRATION: string = this.URL_ROOT + "user_api/registration";
	public USER_CHANGE_PASSWORD: string = this.URL_ROOT + "user_api/change_password";


	public USER_TRANSACTION: string = this.URL_ROOT + "user_api/get_user_transactions";
	public GET_COUNTRY: string = this.URL_ROOT + "all_area/get_country";
	public GET_STATE: string = this.URL_ROOT + "all_area/get_state";
	public GET_CITY: string = this.URL_ROOT + "all_area/get_city";

	public GET_MY_FEED_LIST: string = this.URL_ROOT + "user_api/get_my_feed_list";
	public GET_FEEDS_LIST: string = this.URL_ROOT + "user_api/get_feed_list";


	public USER_INSERT_FEED: string = this.URL_ROOT + "user_api/insert_user_photo";
	public USER_LIKE_PHOTO_FEED: string = this.URL_ROOT + "user_api/like_user_photo";
	public USER_UNLIKE_PHOTO_FEED: string = this.URL_ROOT + "user_api/unlike_user_photo";
	public USER_REMOVE_PHOTO: string = this.URL_ROOT + "user_api/remove_photo";
	public USER_REPORT_SPAM: string = this.URL_ROOT + "user_api/report_photo";


	public GET_PBCM_LIST: string = this.URL_ROOT + "pbcm/get_pbcm_list";



	//http://pbcm.servsme.in/service/user_api/report_photo?user_photo_id=11





	//http://pbcm.servsme.in/service/user_api/get_feed_list?user_id=2



	//http://localhost:81/pbcm/service/user_api/get_user_transactions?user_id=2

	//get_by_mobile

}

