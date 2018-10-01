import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Board from "./components/Board";
// import List from "./components/List";

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Board} exact path="/board/:id" />
  </Switch>
);
