import React from "react";
import "./Message.css";

interface MessageProps {
  message: string;
  name: string;
  iconUrl: string;
}

class Message extends React.Component<MessageProps, {}> {
  constructor(props: MessageProps, state: {}) {
    super(props);
  }

  onChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      message: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="Message">
        <dt><img src={this.props.iconUrl} alt="icon" />{this.props.name}</dt>
        <dd>{this.props.message}</dd>
      </div>
    );
  }
}

export default Message;