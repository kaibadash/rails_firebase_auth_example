import React from "react";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import FirebaseAuth from "../services/FirebaseAuth";
import AuthorizationService from "../services/AuthorizationService";

class Login extends React.Component<RouteComponentProps<{}>> {
  async componentDidMount() {
    let firebaseAuth = new FirebaseAuth();
    firebaseAuth.initializeFirebaseUI();
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
    return (
      <div className="App">
        Login / Sign Up
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

export default withRouter(Login);