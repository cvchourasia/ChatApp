import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../signin/signin';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  userId: string;
  allrooms = [];
  rooms = [];
  filteredroom = [];
  loading:any;
  ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public app: App, public navParams: NavParams, public fAuth: AngularFireAuth,
    private toastctrl: ToastController,public loadingCtrl: LoadingController) {
    this.userId = this.navParams.get("nickname") as string;
    this.present_wc_alert();
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.getData();
    
  }
  async present_wc_alert() {
    var name = this.userId.substring(0, this.userId.lastIndexOf("@"));
    name = name[0].toUpperCase() + name.slice(1);
    let toast = this.toastctrl.create({
      message: 'Welcome ' + name,
      duration: 3000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
    this.ref.on('value', resp => {
      this.allrooms = [];
      this.rooms = [];
      this.allrooms = snapshotToArray(resp);
      this.allrooms.forEach(async (element) => {
        debugger
        if (element.user == this.userId) {
          this.rooms.push(element);
        }
        else if (element.admin == this.userId) {
          this.rooms.push(element);
        }
      });
    });

  }
  async getData(){
    this.loading.present();
    this.ref.on('value', resp => {
      this.allrooms = [];
      this.rooms = [];
      this.allrooms = snapshotToArray(resp);
      this.allrooms.forEach(async (element) => {
        debugger
        if (element.user == this.userId) {
         await this.rooms.push(element);
        }
        else if (element.admin == this.userId) {
          await this.rooms.push(element);
        } 
      });

      console.log(this.rooms)
      console.log(this.userId)
      this.loading.dismiss();
    });
    
  }
  logout() {
    localStorage.clear();
    this.fAuth.auth.signOut();
    var nav = this.app.getRootNav();
    nav.setRoot(SigninPage);
  }
  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key, roomname) {
    this.navCtrl.setRoot(HomePage, {
      key: key, roomname: roomname,
      nickname: this.navParams.get("nickname")
    });
  }


}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
