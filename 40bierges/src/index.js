import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "./assets/css/main.css";
// pages
import Index from "./views/Index.js"
import Admin from './views/admin/admin'
import Login from './views/login/login'
import Blog from './views/blog/blog'

ReactDOM.render(

  <BrowserRouter>
    <Switch>
      
      <Route
        exact
        path="/admin"
        render={props => <Admin {...props} />}
      />

      <Route
        exact
        path="/login"
        render={props => <Login {...props} />}
      />

      <Route
        exact
        path="/blog"
        render={props => <Blog {...props} />}
      />

      <Route path="/index" render={props => <Index {...props} />} />
      <Redirect to="/index" />

    </Switch>
  </BrowserRouter>
  ,
  document.getElementById("root")
);
