import React, { PropTypes } from 'react';
import { mount } from 'enzyme';

import PropertyProvider, { withProperties } from '..';

const TwoTexts = withProperties(
  ({ text1, text2 }) => <span>{text1} {text2}</span>,
  'text1', 'text2');


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

  test('can chain property holders', () => {
    const wrapper = mount(
      <PropertyProvider text1="bacon">
        <PropertyProvider text2="cheese">
          <TwoTexts />
        </PropertyProvider>
      </PropertyProvider>);

    expect(wrapper).toHaveText('bacon cheese');
  });

  test('can override a previous PropertyProvider', () => {
    const wrapper = mount(
      <PropertyProvider text1="bacon" text2="veggies">
        <PropertyProvider text2="cheese">
          <TwoTexts />
        </PropertyProvider>
      </PropertyProvider>);

    expect(wrapper).toHaveText('bacon cheese');
  });

  test('overriding is not replacing PropertyHolder', () => {
    const wrapper = mount(
      <PropertyProvider text1="bacon" text2="veggies">
        <div>
          <PropertyProvider text2="cheese">
            <TwoTexts />
          </PropertyProvider>
          <TwoTexts />
        </div>
      </PropertyProvider>);
    expect(wrapper).toHaveText('bacon cheesebacon veggies');
  });
});
