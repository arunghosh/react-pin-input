import React from 'react';
import ReactDOM from 'react-dom';
import PinInput from '../src';

ReactDOM.render(
  <PinInput length={5} secret focus/>,
  document.getElementById('app')
);

