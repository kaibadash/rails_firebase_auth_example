import React from "react";
import initFirebase from "../services/Firebase";

class Login extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    initFirebase();
  }
  render() {
    return (
      <div className="App">
        Login
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

export default Login;
