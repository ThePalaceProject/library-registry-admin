import * as React from "react";

export interface FieldsetProps {
  legend: string;
  elements: Array<JSX.Element>;
  badgeClass?: string;
  badgeText?: string;
}

export default (props: FieldsetProps) => {
      return(
      <fieldset className="form-group well">
        <legend>{props.legend}</legend>
        {props.elements}
        {
          props.badgeText &&
          <span className={`badge badge-${props.badgeClass || "default"}`}>{props.badgeText}</span>
        }
      </fieldset>
    );
};
