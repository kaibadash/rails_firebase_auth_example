import React from "react";
import { withRouter, StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import FirebaseAuth from "../services/FirebaseAuth";
import PositiveButton from "../components/PositiveButton";

export interface PasswordReminderState extends StaticContext {
  email: string;
}

class SignUp extends React.Component<RouteComponentProps<{}>, PasswordReminderState> {
  constructor(props: RouteComponentProps<{}>, state: PasswordReminderState) {
    super(props);
    this.state = { email: "" };
  }

  async sendPasswordReminder() {
    await new FirebaseAuth().sendPasswordReminder(this.state.email);
    alert("メールを確認してください");
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div>
        <p>アカウントを忘れた場合</p>
        <input
          type="text"
          value={this.state.email}
          placeholder="email"
          onChange={(e) => {
            this.handleChange(e);
          }}
        ></input>
        <PositiveButton
            onClick={() => {
              this.sendPasswordReminder();
            }}
            label="メール送信"
          ></PositiveButton>
      </div>
    );
  }
}

export default withRouter(SignUp);
