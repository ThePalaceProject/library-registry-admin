import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Form, Input } from "library-simplified-reusable-components";
import Fieldset from "./Fieldset";
import ActionCreator from "../../actions";
import { State } from "../../reducers";
import { FetchErrorData } from "@thepalaceproject/web-opds-client/lib/interfaces";


export interface LogInFormProps {
  extraFields?: Array<JSX.Element>;
  title?: string;
  legend?: string;
  logIn?: any;
}

export default (props) => {
  const lastError: FetchErrorData = useSelector((state: State) => state.admin.fetchError);
  const defaultLogIn = useDefaultLoginDispatch();

  const logIn = props.logIn ?? defaultLogIn;
  const title = props.title ?? "Log In";
  const legend = props.legend ?? "Credentials";

  const submitHandler = async (data: FormData) => {
    await logIn(data);
    window.location.reload();
  };

  const username = <Input id="username" key="username" name="username" label="Username" />;
  const password = <Input id="password" key="password" type="password" name="password" label="Password" />;
  const elements = props.extraFields ? [username, password].concat(props.extraFields) : [username, password];
  const fieldset = <Fieldset key="credentials" legend={legend} elements={elements} />;
  return(
    <Form
      className="centered border logIn"
      title={title}
      content={[fieldset]}
      buttonContent="Submit"
      buttonClass="centered"
      onSubmit={submitHandler}
      errorText={lastError && (lastError.response || "Invalid credentials")}
    />
  );
};

const useDefaultLoginDispatch = () => {
  const dispatch = useDispatch();
  const actions = new ActionCreator(null);
  return (data: FormData) => dispatch(actions.logIn(data));
};
