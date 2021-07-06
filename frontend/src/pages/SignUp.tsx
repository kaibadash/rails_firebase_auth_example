import React from "react";
import { withRouter, StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import FirebaseAuth from "../services/FirebaseAuth";
import SignUpService from "../services/SignUpService";
import PositiveButton from "../components/PositiveButton";
import styles from "./SignUp.module.css";

export interface SignUpState extends StaticContext {
  name: string;
}

class SignUp extends React.Component<RouteComponentProps<{}>, SignUpState> {
  constructor(props: RouteComponentProps<{}>, state: SignUpState) {
    super(props);
    this.state = { name: "" };
  }
  async componentDidMount() {
    let firebaseAuth = new FirebaseAuth();
    let idToken = await firebaseAuth.getIdToken();
    if (idToken === "") {
      this.props.history.push("/login");
      return "";
    }
    return idToken;
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  async singUp() {
    let idToken = await this.componentDidMount();
    await SignUpService.signUp(idToken, this.state.name);
    this.props.history.push("/messages");
  }

  render() {
    return (
      <div className={styles.SignUp}>
        <h2>Sign Up</h2>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.handleChange(e);
          }}
          placeholder="名前"
        ></input>
        <PositiveButton
            onClick={() => {
              this.singUp();
            }}
            label="登録"
          ></PositiveButton>
      </div>
    );
  }
}

export default withRouter(SignUp);
