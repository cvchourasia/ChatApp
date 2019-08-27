import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class User {
  email: string;
  password: string;
}
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public user: User = new User();
  data = { nickname: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAuth: AngularFireAuth,
    private toastctrl: ToastController) {
    //this.user.email="webrockzz@gmail.com";
    // this.user.password="123456789";

    if (localStorage.getItem("baatchituser") === null || localStorage.getItem("baatchituser") === null) {
      console.log('ionViewDidLoad SigninPage');

    }
    else {
      this.user.email = localStorage.getItem('baatchituser');
      this.user.password = localStorage.getItem('baatchitpassword');
      this.login()
    }
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }
  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        localStorage.setItem('baatchituser', this.user.email.toLowerCase());
        localStorage.setItem('baatchitpassword', this.user.password);
        this.navCtrl.setRoot(RoomPage, {
          nickname: this.user.email.toLowerCase()
        });
      }

    } catch (err) {
      let toast = this.toastctrl.create({
        message: err,
        duration: 5000
      });
      toast.present();
      console.error(err);
    }
  }
  ionViewDidLoad() {

  }

  validation() {
    if (this.data.nickname == null || this.data.nickname == undefined || this.data.nickname == "" || this.data.nickname == " ") {
      let toast = this.toastctrl.create({
        message: "Enter Username",
        duration: 3000
      });
      toast.present();
    }
  
    else if (this.user.password == null || this.user.password == undefined || this.user.password == "" || this.user.password == " ") {
      let toast = this.toastctrl.create({
        message: "Enter Password",
        duration: 3000
      });
      toast.present();
    }
    else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data.nickname)) {
       // return (true);
        this.login();
      }
      else {      
        let toast = this.toastctrl.create({
          message: "You have entered an invalid Username!",
          duration: 3000
        });
        toast.present();
        //return (false);
        // alert("Enter Username")
      }
      
    }
  }
  enterNickname() {
    this.data.nickname = this.user.email;
    this.validation();
  }

}
