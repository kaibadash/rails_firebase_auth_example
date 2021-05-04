import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";
import MessageService from "../services/MessageService";
import Form from "../components/Form";
import Message from "../components/Message";

interface IMessage {
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
  messages: Array<IMessage>;
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
      if (err.response.status === 401) {
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
            { 
              this.state.messages.map((message) => {
                return (
                  <Message key={message.id} name={message.user.name} message={message.body}></Message>
                );
              })
            }
          </dl>
        </div>
      </div>
    );
  }
}

export default withRouter(Messages);
