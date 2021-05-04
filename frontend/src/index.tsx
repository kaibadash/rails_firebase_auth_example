import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";

ReactDOM.render(
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/messages" component={Messages}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
