import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
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

test('The inputs should be render with initial value', () => {
  const initialValue = '76239';
  const pinInput = mount(<PinInput initialValue={initialValue} length={5} />);
  expect(pinInput.find('input').map(el => el.instance().value).join('')).toEqual(initialValue);
});

test('The inputs should not allow special characters', () => {
  const initialValue = '^%#$@';
  const pinInput = mount(<PinInput initialValue={initialValue} length={5} type='alphanumeric' />);
  expect(pinInput.find('input').map(el => el.instance().value).join('')).toEqual(''); 
})

test('The inputs should allow special characters', () => {
  const initialValue = '%#$@';
  const pinInput = mount(<PinInput initialValue={initialValue} length={5} 
    type='alphanumeric' regexCriteria={/^[ A-Za-z0-9_@./#&%$+-]*$/} />);
  expect(pinInput.find('input').map(el => el.instance().value).join('')).toEqual(initialValue); 
})