import * as React from "react";
import LibrariesPage from "./LibrariesPage";
import { Store } from "redux";
import { State } from "../reducers/index";
import * as PropTypes from "prop-types";

export interface LibrariesListContainerContext {
  store: Store<State>;
}

export default class LibrariesListContainer extends React.Component<{}, {}> {
  context: LibrariesListContainerContext;
  static contextTypes: React.ValidationMap<LibrariesListContainerContext> = {
    store: PropTypes.object.isRequired as React.Validator<Store>,
  };

  render(): JSX.Element {
    return(
      <LibrariesPage store={this.context.store} />
    );
  }

}