import { Children, Component, PropTypes } from 'react';

import PropertyHolder from './PropertyHolder';


export default class PropertyProvider extends Component {
  constructor(props) {
    super(props);
    this.holder = new PropertyHolder(props);
  }

  getChildContext() {
    return { propertyHolder: this.holder };
  }

  render() {
    return Children.only(this.props.children);  // eslint-disable-line react/prop-types
  }
}

PropertyProvider.childContextTypes = {
  propertyHolder: PropTypes.object,
};
