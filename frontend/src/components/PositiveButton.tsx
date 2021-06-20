import React from "react";
import styles from "./PositiveButton.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

class PositiveButton extends React.Component<ButtonProps, {}> {
  constructor(props: ButtonProps, state: {}) {
    super(props);
  }

  render() {
    return (
      <button className={styles.PositiveButton} onClick={() => this.props.onClick()}>
        {this.props.label}
      </button>
    );
  }
}

export default PositiveButton;
