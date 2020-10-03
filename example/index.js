import React from "react";
import ReactDOM from "react-dom";
import PinInput from "../src";

let pin;

ReactDOM.render(
  <div>
    <PinInput
      length={5}
      initialValue="TFSAA"
      focus
      // disabled
      // secret
      ref={p => (pin = p)}
      type="alphanumeric"
      onChange={v => console.log(v)}
      // onComplete={v => pin.clear(v)}
    />
    <button onClick={() => pin.clear()}>Clear</button>
  </div>,
  document.getElementById("app")
);
