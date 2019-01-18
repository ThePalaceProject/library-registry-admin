import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, browserHistory, hashHistory } from "react-router";
import ContextProvider from "./components/ContextProvider";
import App from "./components/App";

interface ConfigurationSettings {
  /** A token generated by the server to prevent Cross-Site Request Forgery.
      The token should be included in an 'X-CSRF-Token' header in any non-GET
      requests. */
  csrfToken: string;
}

/** The main admin interface application. Create an instance of this class
    to render the app and set up routing. */
class RegistryAdmin {
  constructor(config: ConfigurationSettings) {
    let div = document.createElement("div");
    div.id = "landing-page";
    document.getElementsByTagName("body")[0].appendChild(div);
    let h1 = document.createElement("h1");
    h1.innerText = "The component isn't loading";
    div.appendChild(h1);
    ReactDOM.render(
      <ContextProvider {...config}>
        <Router history={browserHistory}>
          <Route path="/admin" component={App} />
        </Router>
      </ContextProvider>,
      document.getElementById("landing-page")
    );
  }
}

export = RegistryAdmin;
