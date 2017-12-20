import React from 'react';
import ReactDOM from 'react-dom';
import PinInput from '../src';

let pin;

ReactDOM.render(
  <div>
    <PinInput
      length={5}
      focus
      ref={p => (pin = p)}
      type="numeric"
      onComplete={v => alert(v)}
    />
    <button onClick={() => pin.clear()}>Clear</button>
  </div>,
  document.getElementById('app'),
);
