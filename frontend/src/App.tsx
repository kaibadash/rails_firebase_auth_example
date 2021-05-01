import React from "react";
import "./App.css";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";

interface AppProps extends RouteComponentProps<{}> {
}

class App extends React.Component<AppProps> {
  handleLogin = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        Home
        <button onClick={() => this.handleLogin()}>Login / Sign up</button>
      </div>
    );
  }
}

export default withRouter(App);