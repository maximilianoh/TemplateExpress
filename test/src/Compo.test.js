import React from 'react';
import { shallow } from '../enzyme';
import Compo  from '../../src/components/compo';

let wrapper = shallow(<Compo msg="Test"/>);

test('Text from Component', () => {
  expect(wrapper.text()).toEqual('Called from Test');
});

