import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

class Header extends React.Component<{}> {
  render() {
    return (
      <div className={styles.Header}>
        <h1><a href="/">My BBS</a></h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/password_reminder">Remind account</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
