import React from 'react';
import { mount } from 'enzyme';

import PropertyProvider, { withProperties } from '..';

describe('withProperty', () => {
  test('can access properties in the property provider', () => {
    // eslint-disable-next-line react/prop-types
    const TestComponent = ({ status }) => <span>{status}</span>;
    const ProvidedComponent = withProperties(TestComponent, 'status');
    const wrapper = mount(
      <PropertyProvider status="cool">
        <ProvidedComponent />
      </PropertyProvider>);

    expect(wrapper).toHaveText('cool');
  });
});
