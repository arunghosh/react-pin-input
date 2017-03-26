import React from 'react';
import { shallow } from 'enzyme';
import PinInput from '../src/PinInput';
import PinItem from '../src/PinItem';

test('The inputs should be equal to the length specified', () => {
  const pinInput = shallow(<PinInput length={5} />);
  expect(pinInput.find(PinItem)).toHaveLength(5);
});
