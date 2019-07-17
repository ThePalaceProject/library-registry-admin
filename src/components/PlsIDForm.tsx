import * as React from "react";
import { Form } from "library-simplified-reusable-components";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { FetchErrorData } from "opds-web-client/lib/interfaces";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibraryData } from "../interfaces";
import { CheckSoloIcon } from "@nypl/dgx-svg-icons";
import Input from "./reusables/Input";

export interface PlsIDFormOwnProps {
  uuid: string;
  store: Store<State>;
  fetchLibrary: (uuid: string) => LibraryData;
  currentID?: string;
}

export interface PlsIDFormStateProps {
  error?: FetchErrorData;
}

export interface PlsIDFormDispatchProps {
  postPlsID?: (data: FormData) => Promise<void>;
}

export interface PlsIDFormProps extends PlsIDFormOwnProps, PlsIDFormStateProps, PlsIDFormDispatchProps {}

export interface PlsIDState {
  saved: boolean;
}

export class PlsIDForm extends React.Component<PlsIDFormProps, PlsIDState> {
  constructor(props: PlsIDFormProps) {
    super(props);
    this.state = { saved: false };
    this.submit = this.submit.bind(this);
  }
  async submit(data: FormData) {
    await this.props.postPlsID(data);
    await this.props.fetchLibrary(this.props.uuid);
    this.setState({ saved: !this.props.error });
  }
  render(): JSX.Element {
    let isSaved = this.state.saved && !this.props.error;
    let icon = isSaved ? <CheckSoloIcon /> : null;
    let buttonText = isSaved ? "Saved" : "Save";
    return(
      <Form
        className="border pls-id"
        title="PLS ID"
        buttonClass={`left-align top-align bottom-align ${isSaved && "success"}`}
        buttonContent={<span>{buttonText}{icon}</span>}
        onSubmit={this.submit}
        content={<Input key="pls" name="pls_id" value={this.props.currentID} />}
        hiddenName="uuid"
        hiddenValue={this.props.uuid}
        errorText={this.props.error ? this.props.error.response : null}
      />
    );
  }
}

function mapStateToProps(state: State, ownProps: PlsIDFormOwnProps) {
  return {
    error: state.plsID && (state.plsID.formError || state.plsID.fetchError)
  };
}

function mapDispatchToProps(dispatch: Function, ownProps: PlsIDFormOwnProps) {
  let actions = new ActionCreator(null);
  return {
    postPlsID: (data: FormData) => dispatch(actions.postPlsID(data)),
  };
}

const ConnectedPlsIDForm = connect<PlsIDFormStateProps, PlsIDFormDispatchProps, PlsIDFormOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PlsIDForm);

export default ConnectedPlsIDForm;
