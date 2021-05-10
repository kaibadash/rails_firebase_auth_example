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
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
    };

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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