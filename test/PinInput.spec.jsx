import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PinInput from '../src/PinInput';
import PinItem from '../src/PinItem';

configure({ adapter: new Adapter() });


test('The inputs should be equal to the length specified', () => {
  const pinInput = shallow(<PinInput length={5} />);
  expect(pinInput.find(PinItem)).toHaveLength(5);
});

test('The inputs should be styled via inputStyle prop', () => {
  const pinInput = mount(<PinInput inputStyle={{ color: 'red' }} length={5} />);

  expect(pinInput.find('input').first().props().style.color).toEqual('red');
});