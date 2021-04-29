import React from 'react';
import './App.css';
import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0cqV8li43IUqCvmB19A8q6UOxhtZ8x6U",
  authDomain: "rails-firebase-auth-example.firebaseapp.com",
  projectId: "rails-firebase-auth-example",
  storageBucket: "rails-firebase-auth-example.appspot.com",
  messagingSenderId: "365350306449",
  appId: "1:365350306449:web:9802f54f8e66673933f530",
  measurementId: "G-3D2DZJ3C04"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "http://localhost:3000/",
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log(authResult, redirectUrl);
        firebase.auth().currentUser?.getIdToken().then((idToken) => {
          console.log(idToken);
        }).catch((error) => {
          console.log(error);
        });
        // TODO: APIを実行しすでに登録済みかどうか調べ、登録済みでないならユーザ登録へ
        return true;
      },
      signInFailure: (error) => {
        window.alert(error.message);
      }
    }
  });  
}

function App() { 
  return (
    <div className="App">
      rails_firebase_auth_example
       <div id="firebaseui-auth-container"></div>
       <div id="loader">Loading...</div>
    </div>
  );
}

export default App;
