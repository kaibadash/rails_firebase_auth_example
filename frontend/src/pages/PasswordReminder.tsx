import React from "react";
import { withRouter, StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import FirebaseAuth from "../services/FirebaseAuth";
import PositiveButton from "../components/PositiveButton";
import styles from "./PasswordReminder.module.css";

export interface PasswordReminderState extends StaticContext {
  email: string;
}

class PasswordReminder extends React.Component<
  RouteComponentProps<{}>,
  PasswordReminderState
> {
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
      <div className={styles.PasswordReminder}>
        <h2>アカウントを忘れた時は</h2>
        <div>
          <input
            type="text"
            value={this.state.email}
            placeholder="email"
            onChange={(e) => {
              this.handleChange(e);
            }}
          ></input>
        </div>
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

export default withRouter(PasswordReminder);
