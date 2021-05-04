import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";
import MessageService from "../services/MessageService";
import Form from "./Form";

interface Message {
  user: {
    name: string;
  };
  id: number;
  body: string;
}

interface MessageState {
  user: {
    name: string;
  };
  message: string;
  messages: Array<Message>;
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
      });
    } catch (err) {
      if (err.response.status === 404) {
        return this.props.history.push("/login");
      }
      alert(err);
    }
    this.reloadMessages();
  }

  async reloadMessages() {
    let messages = await MessageService.getMessages();
    this.setState({
      messages: messages,
    });
  }

  render() {
    return (
      <div className="Messages">
        <Form
          name={this.state?.user?.name}
          onPosted={this.reloadMessages.bind(this)}
        ></Form>
        <div>
          <dl>
            {this.state.messages.map((message) => {
              return (
                <div key={message.id}>
                  <dt>{message.user.name}</dt>
                  <dd>{message.body}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    );
  }
}

export default withRouter(Messages);
