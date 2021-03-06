import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";
import MessageService from "../services/MessageService";
import Form from "../components/Form";
import Message from "../components/Message";
import styles from "./Messages.module.css";

interface IMessage {
  user: {
    name: string;
    icon_url: string;
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
    await this.authorize();
    await this.reloadMessages();
  }

  async authorize() {
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
  }

  async reloadMessages() {
    let messages = await MessageService.getMessages();
    this.setState({
      messages: messages,
    });
  }

  handleOnPosted = this.reloadMessages.bind(this);

  render() {
    return (
      <div className={styles.Messages}>
        <Form
          name={this.state?.user?.name}
          onPosted={this.handleOnPosted}
        ></Form>
        <div>
          <dl>
            {this.state.messages.map((message) => {
              return (
                <div className={styles.MessageContainer}>
                  <Message
                    key={message.id}
                    name={message.user.name}
                    iconUrl={message.user.icon_url}
                    message={message.body}
                  ></Message>
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
