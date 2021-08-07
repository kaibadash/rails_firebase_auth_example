import React from "react";
import styles from "./Message.module.css";

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
      <div className={styles.Message}>
        <dt className={styles.Name}><img className={styles.Icon} src={this.props.iconUrl} alt="icon" />{this.props.name}</dt>
        <dd className={styles.MessageBody}>{this.props.message}</dd>
      </div>
    );
  }
}

export default Message;
