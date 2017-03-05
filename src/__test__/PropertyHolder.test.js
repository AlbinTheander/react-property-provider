import { stub } from 'sinon';
import PropertyHolder from '../PropertyHolder';

describe('PropertyHolder', () => {
  test('get returns a the property value', () => {
    const holder = new PropertyHolder({ status: 'cool' });
    expect(holder.get('status')).toBe('cool');
  });

  test('get returns undefined when the property is not defined', () => {
    const holder = new PropertyHolder({ status: 'cool' });
    expect(holder.get('color')).toBeUndefined();
  });

  test('get can get a property from a parent holder', () => {
    const parent = new PropertyHolder({ status: 'cool' });
    const holder = new PropertyHolder({ fruit: 'banana' }, parent);

    expect(holder.get('status')).toBe('cool');
  });

  test('own properties will override parent ones', () => {
    const parent = new PropertyHolder({ status: 'cool' });
    const holder = new PropertyHolder({ status: 'awesome' }, parent);

    expect(holder.get('status')).toBe('awesome');
  });

  test('set changes a property value', () => {
    const holder = new PropertyHolder({ status: 'square' });
    holder.set('status', 'cool');

    expect(holder.get('status')).toBe('cool');
  });

  test('set does not add properties', () => {
    const holder = new PropertyHolder({ status: 'cool' });
    holder.set('fruit', 'banana');

    expect(holder.get('fruit')).toBeUndefined();
  });

  test('set does not affect parent properties', () => {
    const parent = new PropertyHolder({ status: 'cool' });
    const holder = new PropertyHolder({ fruit: 'banana' }, parent);
    holder.set('status', 'sad');

    expect(holder.get('status')).toBe('cool');
  });

  test('properties can be subscribed to', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.subscribe('status', callback);
    holder.set('status', 'cool');

    expect(callback.calledOnce).toBe(true);
  });

  test('every change to a property will notify subscribers', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.subscribe('status', callback);
    holder.set('status', 'cool');
    holder.set('status', 'awesome');

    expect(callback.calledTwice).toBe(true);
  });

  test('setting a property to its current value will not notify subscribers', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.subscribe('status', callback);
    holder.set('status', 'sad');

    expect(callback.notCalled).toBe(true);
  });

  test('subscribing to a non-existing prop is a noop', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.subscribe('fruit', callback);
    holder.set('fruit', 'apple');

    expect(callback.notCalled).toBe(true);
  });

  test('subscriptions are passed to parent for non-existing props', () => {
    const parent = new PropertyHolder({ status: 'sad' });
    const holder = new PropertyHolder({ fruit: 'banana' }, parent);
    const callback = stub();

    holder.subscribe('status', callback);
    parent.set('status', 'cool');

    expect(callback.calledOnce).toBe(true);
  });

  test('properties can be unsubscribed from', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.subscribe('status', callback);
    holder.set('status', 'cool');
    holder.unsubscribe('status', callback);
    holder.set('status', 'awesome');

    expect(callback.calledOnce).toBe(true);
  });

  test('unsubscribe is delegating to parent if necessary', () => {
    const parent = new PropertyHolder({ status: 'sad' });
    const holder = new PropertyHolder({ fruit: 'banana' }, parent);
    const callback = stub();

    holder.subscribe('status', callback);
    parent.set('status', 'cool');
    holder.unsubscribe('status', callback);
    parent.set('status', 'awesome');

    expect(callback.calledOnce).toBe(true);
  });

  test('invalid unsubscribes does not generate an error', () => {
    const holder = new PropertyHolder({ status: 'sad' });
    const callback = stub();

    holder.unsubscribe('status', callback);
    holder.unsubscribe('fruit', callback);
  });
});
