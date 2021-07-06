import React from "react";
import styles from "./App.module.css";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PositiveButton from "./components/PositiveButton";

interface AppProps extends RouteComponentProps<{}> {}

class App extends React.Component<AppProps> {
  handleLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.topContainer}>
          <div>
            <h2>My BBSにようこそ！</h2>
            <p>無性に書き込みたくなる文章をここに書く。</p>
          </div>
        </div>
        <PositiveButton
          onClick={this.handleLogin}
          label="Login / Sign up"
        ></PositiveButton>
      </div>
    );
  }
}

export default withRouter(App);
