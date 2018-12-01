import React from "react";
import ReactDOM from "react-dom";
import PinInput from "../src";

let pin;

ReactDOM.render(
  <div>
    <PinInput
      length={5}
      focus
      secret
      ref={p => (pin = p)}
      type="numeric"
      onChange={v => console.log(v)}
      onComplete={v => pin.clear(v)}
    />
    <button onClick={() => pin.clear()}>Clear</button>
  </div>,
  document.getElementById("app")
);
