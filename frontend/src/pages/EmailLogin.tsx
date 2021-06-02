import React from "react";
import { withRouter, StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import firebase from "firebase";
import FirebaseAuth from "../services/FirebaseAuth";
import AuthorizationService from "../services/AuthorizationService";
import PositiveButton from "../components/PositiveButton";

export interface LoginState extends StaticContext {
  email: string;
}

class EmailLogin extends React.Component<RouteComponentProps<{}>, LoginState> {
  constructor(props: RouteComponentProps<{}>, state: LoginState) {
    super(props);
    this.state = { email: "" };
  }
  
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  sendEmail() {
    let actionCodeSettings = {
      url: 'http://localhost:3000/email_login',
      handleCodeInApp: true
    };
    firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', this.state.email);
      alert("メールを送りました。");
    }).catch((error) => {
      alert(error); 
    });
  }

  async checkLoggedIn() {
    if (!firebase.auth().isSignInWithEmailLink(window.location.href)) {
      return;
    }
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    if (!email) {
      return;
    }
    let userCredential = await firebase.auth().signInWithEmailLink(email, window.location.href);
    let idToken = await userCredential.user?.getIdToken() ?? "";
    window.localStorage.removeItem('emailForSignIn');
    if (idToken === "") {
      return;
    }
    if (await AuthorizationService.authrize(idToken)) {
      return this.props.history.push("/messages");
    }
    return this.props.history.push("/signup");
  }

  async componentDidMount() {
    this.checkLoggedIn();
  }

  render() {
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
        <input
          type="text"
          value={this.state.email}
          onChange={(e) => {
            this.handleChange(e);
          }}
          placeholder="メールアドレス"
        ></input>
        <PositiveButton
          onClick={() => {
            this.sendEmail();
          }}
          label="メール送信"
        ></PositiveButton>
      </div>
    );
  }
}

export default withRouter(EmailLogin);
