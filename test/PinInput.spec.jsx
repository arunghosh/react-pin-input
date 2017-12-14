import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PinInput from '../src/PinInput';
import PinItem from '../src/PinItem';

configure({ adapter: new Adapter() });


test('The inputs should be equal to the length specified', () => {
  const pinInput = shallow(<PinInput length={5} />);
  expect(pinInput.find(PinItem)).toHaveLength(5);
});
