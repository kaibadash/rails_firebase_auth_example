import React from "react";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import firebase from 'firebase';
import FirebaseAuth from "../services/FirebaseAuth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AuthorizationService from "../services/AuthorizationService";

class Login extends React.Component<RouteComponentProps<{}>> {
  async componentDidMount() {
    let firebaseAuth = new FirebaseAuth();
    let idToken = await firebaseAuth.getIdToken();
    if (idToken === "") {
      return;     
    }
    if (await AuthorizationService.authrize(idToken)) {
      return this.props.history.push('/messages');
    }
    return this.props.history.push('/signup');
  }

  render() {
    const uiConfig = {
      signInSuccessUrl: '/login',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
    };

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

    return (
      <div className="Login">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}

export default withRouter(Login);