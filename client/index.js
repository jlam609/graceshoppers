import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import store from "./store";
import App from "./Components/App";

const Root = document.getElementById("root");

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  Root,
  () => console.log("rendered")
);
