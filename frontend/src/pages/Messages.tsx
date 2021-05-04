import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";
import MessageService from "../services/MessageService";

interface Message {
  user: {
    name: string;
  };
  body: string;
}

interface MessageState {
  user: {
    name: string;
  };
  message: string;
  messages: Array<Message>
}

class Messages extends React.Component<RouteComponentProps<{}>, MessageState> {
  constructor(props: RouteComponentProps<{}>, state: MessageState) {
    super(props);
    this.state = { user: { name: "" }, message: "", messages: [] };
  }
  
  async componentDidMount() {
    try {
      this.setState({
        user: await AuthorizationService.authrizedUser(),
        message: "",
        messages: await MessageService.getMessages()   
      });
    } catch (err) {
      if (err.response.status === 404) {
        return this.props.history.push("/login");
      }
      alert(err);
    }
  }

  onChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      message: e.currentTarget.value,
    });
  }

  async postMessage() {
    try {
      await MessageService.post(this.state.message);
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <div className="Messages">
        <div>
          name: {this.state?.user?.name}
          <textarea
            value={this.state.message}
            onChange={(e) => {
              this.onChangeMessage(e);
            }}
          ></textarea>
          <button onClick={() => this.postMessage()}>Post</button>
        </div>

        <div>
          <dl>
          {this.state.messages.map((message) => {
            return (
              <>
                <dt>{message.user.name}</dt>
                <dd>{message.body}</dd>
              </>
            );
          })}
          </dl>
        </div>
      </div>
    );
  }
}

export default withRouter(Messages);
