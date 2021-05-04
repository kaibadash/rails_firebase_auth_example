import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends React.Component<{}> {
  render() {
    return (
      <div className="Header">
        <h1>My BBS</h1>
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
        </ul>
      </div>
    );
  }
}

export default Header;
