import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

ReactDOM.render(
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/messages">messages</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/messages" component={Messages}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
