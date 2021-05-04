import React from "react";
import MessageService from "../services/MessageService";

interface FormState {
  message: string;
}

interface FormProps {
  name: string;
  onPosted: () => void;
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps, state: FormState) {
    super(props);
    this.state = { message: "" };
  }

  onChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      message: e.currentTarget.value,
    });
  }

  // TODO: 親でやるべきことのような気がしないでもない
  async postMessage() {
    try {
      await MessageService.post(this.state.message);
      this.setState({
        message: "",
      });
      this.props.onPosted();
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <div className="Form">
        name: {this.props.name}
        <textarea
          value={this.state.message}
          onChange={(e) => {
            this.onChangeMessage(e);
          }}
        ></textarea>
        <button onClick={() => this.postMessage()}>Post</button>
      </div>
    );
  }
}

export default Form;
