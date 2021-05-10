import React from "react";
import MessageService from "../services/MessageService";
import "./Form.css";
import PositiveButton from "./PositiveButton";

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
        <div>{this.props.name}</div>
        <textarea
          className="message"
          value={this.state.message}
          onChange={(e) => {
            this.onChangeMessage(e);
          }}
        ></textarea>
        <div>
        <PositiveButton onClick={() => this.postMessage()} label="Post"></PositiveButton>
        </div>
      </div>
    );
  }
}

export default Form;
