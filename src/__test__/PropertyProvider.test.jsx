import React, { PropTypes } from 'react';
import { mount } from 'enzyme';

import PropertyProvider from '..';


describe('PropertyProvider', () => {
  test('puts a propety holder in the context', () => {
    const TestComponent = function TestComponent(props, context) {
      return <span>{context.propertyHolder ? 'Yes' : 'No'}</span>;
    };

    TestComponent.contextTypes = { propertyHolder: PropTypes.object };
    const wrapper = mount(<PropertyProvider><TestComponent /></PropertyProvider>);
    expect(wrapper).toHaveText('Yes');
  });

  test('adds props to the property holder', () => {
    const TestComponent = function TestComponent(props, context) {
      return <span>{context.propertyHolder.get('status')}</span>;
    };

    TestComponent.contextTypes = { propertyHolder: PropTypes.object };
    const wrapper = mount(<PropertyProvider status="cool"><TestComponent /></PropertyProvider>);
    expect(wrapper).toHaveText('cool');
  });
});
