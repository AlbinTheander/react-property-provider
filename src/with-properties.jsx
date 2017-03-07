import React, { Component, PropTypes } from 'react';

export default function withProperties(WrappedComponent, ...propNames) {
  class WithProps extends Component {
    constructor(props, context) {
      super(props, context);
      if (context.propertyHolder) {
        this.update = this.update.bind(this);
        propNames.forEach(p => context.propertyHolder.subscribe(p, this.update));
      }
    }
    componentWillUnmount() {
      if (this.context.propertyHolder) {
        const propertyHolder = this.context.propertyHolder;
        propNames.forEach(p => propertyHolder.unsubscribe(p, this.update));
      }
    }
    update() {
      this.forceUpdate();
    }
    render() {
      const propertyHolder = this.context.propertyHolder;
      const props = { ...this.props };
      if (!propertyHolder) {
        return <WrappedComponent {...props} />;
      }
      propNames.forEach((p) => {
        props[p] = p in props ? props[p] : propertyHolder.get(p);
      });

      return <WrappedComponent {...props} />;
    }
  }

  WithProps.contextTypes = { propertyHolder: PropTypes.object };

  return WithProps;
}
