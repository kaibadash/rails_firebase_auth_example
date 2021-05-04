import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export default class FirebaseAuth {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyA0cqV8li43IUqCvmB19A8q6UOxhtZ8x6U",
      authDomain: "rails-firebase-auth-example.firebaseapp.com",
      projectId: "rails-firebase-auth-example",
      storageBucket: "rails-firebase-auth-example.appspot.com",
      messagingSenderId: "365350306449",
      appId: "1:365350306449:web:9802f54f8e66673933f530",
      measurementId: "G-3D2DZJ3C04",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async initializeFirebaseUI() {
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/login",
      callbacks: {
        signInFailure: (error) => {
          window.alert(error.message);
        },
      },
    });
  }

  async getIdToken(): Promise<string> {
    let user = await this.onAuthStateChangedAsync();
    let idToken = await user?.getIdToken();
    return idToken ?? ""
  }

  async logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  private async onAuthStateChangedAsync(): Promise<firebase.User | null> {
    return new Promise( (resolve, reject) => {
      firebase.auth().onAuthStateChanged( user => {
        resolve(user);
      });
    });
  }
}
