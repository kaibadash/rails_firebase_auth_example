import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import FirebaseAuth from "../services/FirebaseAuth";

class Logout extends React.Component<RouteComponentProps<{}>> {
  async componentDidMount() {
    await new FirebaseAuth().logout();
    await axios.delete("/api/authorizations");
    return this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        Logged out...
      </div>
    );
  }
}

export default withRouter(Logout);
