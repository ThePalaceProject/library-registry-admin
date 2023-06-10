import * as React from "react";
import {useState} from "react";

export interface ToggleProps {
  onToggle: (status: boolean, name?: string) => void;
  initialOn?: boolean;
  label?: string;
  name?: string;
}

export default (props: ToggleProps) => {
  const { onToggle, initialOn = false, name = "toggle" } = props;
  const [ isOn, setOn ] = useState(initialOn);
  const toggle = (e) => {
    e.preventDefault();
    const status = !isOn;
    onToggle(status, name);
    setOn(status);
  };
  const label = props.label ? `${props.label}: ${isOn ? "On" : "Off"}` : null;
  return (
    <form className="toggle-container">
      { label && <label className={isOn ? "active" : ""}><span>{label}</span></label> }
      <div className={`toggle${isOn ? " toggle-on" : ""}`}>
        <button
          tabIndex={0}
          className={`slider${isOn ? " slider-on" : ""}`}
          aria-label="Toggle button"
          aria-pressed={isOn}
          onClick={toggle}
        />
      </div>
    </form>
  );
};
