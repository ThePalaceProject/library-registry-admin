import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import App from "../App";
import { Header } from "library-simplified-reusable-components";
import LogInFrom from "../reusables/LogInForm";
import LibrariesPage from "../LibrariesPage";
import { MemoryRouter } from "react-router-dom";
import buildStore from "../../store";
import { Provider } from "react-redux";
import { AppConfigurationProvider } from "../AppConfiguration";

describe("App", () => {
  let wrapper: Enzyme.ShallowWrapper<{}, {}>;
  let config;
  let store;

  beforeEach(() => {
    store = buildStore();
    config = { username: "" };
    wrapper = Enzyme.mount(
      <Provider store={store}>
        <AppConfigurationProvider value={config}>
          <MemoryRouter initialEntries={["/admin"]}>
            <App imgSrc="" />
          </MemoryRouter>
        </AppConfigurationProvider>
      </Provider>
    );
  });
  it("should render the header and pass it the correct props", () => {
    let header = wrapper.find(Header);
    expect(header.length).to.equal(1);
    expect(header.prop("text")).to.equal("Library Registry Interface");
    expect(header.prop("imgSrc")).to.equal("");
    expect(header.prop("logOut")).to.equal("/admin/log_out");
  });

  it("should render the login form", () => {
    let librariesPage = wrapper.find(LibrariesPage);
    let logInForm = wrapper.find(LogInFrom);
    expect(logInForm.length).to.equal(1);
    expect(librariesPage.length).to.equal(0);
  });

  it("should render the libraries page component", () => {
    config = { username: "Admin" };
    wrapper = Enzyme.mount(
      <Provider store={store}>
        <AppConfigurationProvider value={config}>
          <MemoryRouter initialEntries={["/admin"]}>
            <App imgSrc=""/>
          </MemoryRouter>
        </AppConfigurationProvider>
      </Provider>,
    );
    let librariesPage = wrapper.find(LibrariesPage);
    let logInForm = wrapper.find(LogInFrom);
    expect(logInForm.length).to.equal(0);
    expect(librariesPage.length).to.equal(1);
  });
});
