import React from "react";
import "./App.css";
import initFirebase from "./services/Firebase";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";

interface AppProps extends RouteComponentProps<{}> {
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    initFirebase();
  }
  
  handleLogin = () => {
    let props = this.props as AppProps;
    props.history.push('/login')
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