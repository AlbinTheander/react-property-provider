import { Children, Component } from 'react';
import PropTypes from 'prop-types';

import PropertyHolder from './PropertyHolder';


export default class PropertyProvider extends Component {
  constructor(props, context) {
    super(props);
    const pureProps = { ...props };
    delete pureProps.children;
    this.holder = new PropertyHolder(pureProps, context.propertyHolder);
  }

  getChildContext() {
    return { propertyHolder: this.holder };
  }

  componentWillReceiveProps(newProps) {
    Object.keys(newProps).forEach(prop =>
      prop !== 'children' && this.holder.set(prop, newProps[prop]));
  }

  render() {
    return Children.only(this.props.children);  // eslint-disable-line react/prop-types
  }
}

PropertyProvider.childContextTypes = {
  propertyHolder: PropTypes.object,
};

PropertyProvider.contextTypes = {
  propertyHolder: PropTypes.object,
};
