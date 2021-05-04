import React from "react";
import { withRouter } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";

interface MessageState {
  user: { name: string };
}

class Messages extends React.Component<RouteComponentProps<{}>, MessageState> {
  async componentDidMount() {
    try {
      this.setState({user: await AuthorizationService.authrizedUser()});
    } catch (err) {
      if (err.response.status === 404) {
          return this.props.history.push("/login");
      }
      alert(err);
    }
  }

  render() {
    return (
      <div className="Messages">
        <div>
          name: { this.state?.user?.name }
          <textarea></textarea>
          <button>Post</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Messages);
