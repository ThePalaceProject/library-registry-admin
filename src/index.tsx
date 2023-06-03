import * as React from "react";
import * as ReactDOM from "react-dom";
import buildStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/ContextProvider";
import { ConfigurationProvider, ConfigurationSettings } from "./components/ConfigurationContext";
import App from "./components/App";

/** The main admin interface application. Create an instance of this class
    to render the app and set up routing. */
class LibraryRegistryAdmin {
  constructor(config: ConfigurationSettings) {
    let div = document.createElement("div");
    div.id = "landing-page";
    document.getElementsByTagName("body")[0].appendChild(div);

    // `react-axe` should only run in development and testing mode.
    // Running this is resource intensive and should only be used to test
    // for accessibility and not during active development.
    if (process.env.TEST_AXE === "true") {
      let axe = require("react-axe");
      axe(React, ReactDOM, 1000);
    }

    const store = buildStore();

    ReactDOM.render(
      <Provider store={store}>
      <ConfigurationProvider value={config}>
      <ContextProvider {...config} store={store}>
        <BrowserRouter>
          <App imgSrc={config.imgSrc} />
        </BrowserRouter>
      </ContextProvider>
      </ConfigurationProvider>
      </Provider>,
      document.getElementById("landing-page")
    );
  }
}

export = LibraryRegistryAdmin;
