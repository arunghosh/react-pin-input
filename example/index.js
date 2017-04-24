import React from 'react';
import ReactDOM from 'react-dom';
import PinInput from '../src';

let pin;

ReactDOM.render(
  <div><PinInput length={5} secret focusi ref={p => pin = p}/> 
    <button onClick={() => pin.clear()}>Clear</button> 
  </div>,
  document.getElementById('app')
);

