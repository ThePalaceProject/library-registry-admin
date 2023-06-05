import * as React from "react";
import { useStore} from "react-redux";
import { Header } from "library-simplified-reusable-components";
import LibrariesPage from "./LibrariesPage";
import { Route } from "react-router-dom";
import LogInForm from "./reusables/LogInForm";
import { useAppConfiguration } from "./AppConfiguration";

export default (props) => {
  const store = useStore();
  const { username } = useAppConfiguration();

  return (
    <div id="main-app-component">
      <Header
        text="Library Registry Interface"
        alt="The Palace Project"
        imgSrc={props?.imgSrc}
        logOut="/admin/log_out"
        loggedIn={!!username}
      />
      <main>
        <Route
          path="/admin"
          render={() => (
            username ?
              <LibrariesPage store={store} /> :
              <LogInForm />
          )}
        />
      </main>
    </div>
  );
};
