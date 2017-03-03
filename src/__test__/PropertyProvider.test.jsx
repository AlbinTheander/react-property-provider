import React from 'react';
import { shallow } from 'enzyme';

import PropertyProvider from '../PropertyProvider';


test('PropertyProvider can be rendered', () => {
  const wrapper = shallow(<PropertyProvider />);
  expect(wrapper).toBePresent();
});
