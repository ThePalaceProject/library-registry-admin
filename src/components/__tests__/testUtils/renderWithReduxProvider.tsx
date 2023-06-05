import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import buildStore from "../../../store";

/** Returns a function to create a Redux Provider with the specified store.
 * @param store - The store for the Redux Provider component.
 */
const ReduxProvider = store => ({ children }) => {
  return (<Provider store={store}>{children}</Provider>);
};

/** Helper function to mount the specified UI component under test within
 * Redux <Provider /> component.
 * @param ui     - The element to render.
 * @param state? - Redux store with this state is passed to the Redux <Provider/> component.
 */
export const mountWithReduxProvider = (ui: React.ReactElement, state?) => {
  const wrapper = mount(ui, { wrappingComponent: ReduxProvider(buildStore(state)) });
  const provider = wrapper.getWrappingComponent();
  return { wrapper, provider };
};
