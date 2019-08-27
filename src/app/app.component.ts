import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';

// const config = {
//   apiKey: "AIzaSyA2n1DMnE4-1vKNlEEEmQeumZOdXF2WKsM",
//     authDomain: "chat-demo-ionic.firebaseapp.com",
//     databaseURL: "https://chat-demo-ionic.firebaseio.com",
//     projectId: "chat-demo-ionic",
//     storageBucket: "chat-demo-ionic.appspot.com",
//   // apiKey: 'AIzaSyA2n1DMnE4-1vKNlEEEmQeumZOdXF2WKsM',
//   // authDomain: 'YOUR_FIREBASE_APP_ID.firebaseapp.com',
//   // databaseURL: 'https://chat-demo-ionic.firebaseio.com/',
//   // projectId: 'chat-demo-ionic',
//   // storageBucket: 'gs://chat-demo-ionic.appspot.com',
//   messagingSenderId: "397769087786",
//   appId: "1:397769087786:web:af8aede039153f3a"
// };

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   // firebase.initializeApp(config);
  }
}
