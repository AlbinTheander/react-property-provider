import React, { Children, Component } from 'react';
import { mount } from 'enzyme';

import PropertyProvider, { withProperties } from '..';

/* eslint-disable react/prop-types */

const Status = withProperties(({ status }) => <span>{status}</span>, 'status');
const TwoTexts = withProperties(({ text1, text2 }) => <span>{text1} {text2}</span>, 'text1');

class NeverUpdatingComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return Children.only(this.props.children);
  }
}

describe('withProperty', () => {
  test('can access properties in the property provider', () => {
    const wrapper = mount(
      <PropertyProvider status="cool">
        <Status />
      </PropertyProvider>);

    expect(wrapper).toHaveText('cool');
  });

  test('will update component when property changes', () => {
    const wrapper = mount(
      <PropertyProvider status="cool">
        <Status />
      </PropertyProvider>);

    wrapper.setProps({ status: 'awesome' });
    expect(wrapper).toHaveText('awesome');
  });

  test('will prioritize explicit properties', () => {
    const wrapper = mount(
      <PropertyProvider status="cool">
        <Status status="awesome" />
      </PropertyProvider>);

    expect(wrapper).toHaveText('awesome');
  });

  test('will pass through other properties', () => {
    const wrapper = mount(
      <PropertyProvider text1="bacon">
        <TwoTexts text2="cheese" />
      </PropertyProvider>);

    expect(wrapper).toHaveText('bacon cheese');
  });

  test('will update component even inside non-updating component', () => {
    const wrapper = mount(
      <PropertyProvider status="cool">
        <NeverUpdatingComponent>
          <Status />
        </NeverUpdatingComponent>
      </PropertyProvider>);

    expect(wrapper).toHaveText('cool');

    wrapper.setProps({ status: 'awesome' });
    expect(wrapper).toHaveText('awesome');
  });

  test('will unsubscribe to prop changes when unmounting', () => {
    const wrapper = mount(
      <PropertyProvider status="cool">
        <Status />
      </PropertyProvider>);

    const holder = wrapper.find('PropertyProvider').node.holder;
    expect(holder.props.status.subscribers.length).toBe(1);
    wrapper.unmount();
    expect(holder.props.status.subscribers.length).toBe(0);
  });
});
